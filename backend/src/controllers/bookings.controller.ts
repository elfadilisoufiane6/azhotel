import type { Request, Response } from "express";
import { z } from "zod";
import { query, withTransaction } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";
import { sendBookingConfirmation } from "../services/email.service.js";

const createSchema = z.object({
  roomId:           z.string().uuid().optional(),
  roomSlug:         z.string().optional(),
  rateId:           z.string().uuid().optional(),
  checkIn:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut:         z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests:           z.coerce.number().int().min(1).max(8).default(2),
  firstName:        z.string().min(1),
  lastName:         z.string().min(1),
  email:            z.string().email(),
  phone:            z.string().min(6),
  arrivalTime:      z.string().optional(),
  specialRequests:  z.string().max(2000).optional(),
  total:            z.coerce.number().positive().optional(),
}).refine((d) => d.roomId || d.roomSlug, { message: "roomId or roomSlug required" });

function reference() {
  const r = Math.floor(Math.random() * 36 ** 6).toString(36).toUpperCase().padStart(6, "0");
  return `AZ-${r}`;
}

export const bookingsController = {
  createSchema,

  async create(req: Request, res: Response) {
    const b = req.body as z.infer<typeof createSchema>;
    if (b.checkOut <= b.checkIn) throw new HttpError(400, "Check-out must be after check-in");

    const result = await withTransaction(async (db) => {
      // Resolve room
      const room = await db.query<{ id: string; base_price: number; total_inventory: number; currency: string }>(
        b.roomId
          ? "SELECT id, base_price, total_inventory, currency FROM rooms WHERE id = $1 AND is_active = true"
          : "SELECT id, base_price, total_inventory, currency FROM rooms WHERE slug = $1 AND is_active = true",
        [b.roomId ?? b.roomSlug],
      );
      if (!room.rowCount) throw new HttpError(404, "Room not found");
      const r = room.rows[0];

      // Locked availability check
      const conflicts = await db.query<{ booked: number }>(
        `SELECT COUNT(*)::int AS booked FROM bookings
          WHERE room_id = $1
            AND status IN ('pending','confirmed','checked_in')
            AND check_in  < $3::date
            AND check_out > $2::date
          FOR UPDATE`,
        [r.id, b.checkIn, b.checkOut],
      );
      if ((conflicts.rows[0]?.booked ?? 0) >= r.total_inventory)
        throw new HttpError(409, "No rooms left for those dates");

      const ref = reference();
      const total = b.total ?? (() => {
        const nights = Math.round((+new Date(b.checkOut) - +new Date(b.checkIn)) / 86_400_000);
        return Number(r.base_price) * nights;
      })();

      const inserted = await db.query(
        `INSERT INTO bookings
          (reference, user_id, room_id, rate_plan_id, check_in, check_out,
           guests_adults, guests_children,
           guest_first_name, guest_last_name, guest_email, guest_phone,
           arrival_time, special_requests, total_amount, currency)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 0,
                 $8, $9, $10, $11, $12, $13, $14, $15)
         RETURNING id, reference, status, created_at`,
        [
          ref,
          req.user?.sub ?? null,
          r.id,
          b.rateId ?? null,
          b.checkIn, b.checkOut,
          b.guests,
          b.firstName, b.lastName, b.email, b.phone,
          b.arrivalTime ?? null, b.specialRequests ?? null,
          total, r.currency,
        ],
      );
      return inserted.rows[0];
    });

    // Fire-and-forget email
    sendBookingConfirmation({
      to: b.email,
      reference: result.reference,
      firstName: b.firstName,
      checkIn: b.checkIn,
      checkOut: b.checkOut,
    }).catch((e) => console.error("Email failed:", e));

    res.status(201).json(result);
  },

  async list(req: Request, res: Response) {
    const status = String(req.query.status ?? "");
    const where  = status ? "WHERE b.status = $1" : "";
    const params = status ? [status] : [];
    const r = await query(
      `SELECT b.id, b.reference, b.status, b.check_in, b.check_out, b.total_amount, b.currency,
              b.guest_first_name, b.guest_last_name, b.guest_email,
              r.name AS room_name, r.slug AS room_slug,
              b.created_at
         FROM bookings b
         JOIN rooms r ON r.id = b.room_id
         ${where}
         ORDER BY b.created_at DESC
         LIMIT 200`,
      params,
    );
    res.json(r.rows);
  },

  async findByReference(req: Request, res: Response) {
    const { reference } = req.params;
    const r = await query(
      `SELECT b.*, r.name AS room_name, r.slug AS room_slug
         FROM bookings b
         JOIN rooms r ON r.id = b.room_id
        WHERE b.reference = $1`,
      [reference],
    );
    if (!r.rowCount) throw new HttpError(404, "Booking not found");
    res.json(r.rows[0]);
  },

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const status = String(req.body.status ?? "");
    const allowed = ["pending", "confirmed", "checked_in", "checked_out", "cancelled", "no_show"];
    if (!allowed.includes(status)) throw new HttpError(400, "Invalid status");

    const r = await query(
      "UPDATE bookings SET status = $2 WHERE id = $1 RETURNING id, status",
      [id, status],
    );
    if (!r.rowCount) throw new HttpError(404, "Booking not found");
    res.json(r.rows[0]);
  },
};
