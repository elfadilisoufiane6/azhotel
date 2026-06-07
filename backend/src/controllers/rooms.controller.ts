import type { Request, Response } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";
import { getAvailability } from "../services/availability.service.js";

const availabilitySchema = z.object({
  checkIn:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests:   z.coerce.number().int().min(1).max(8).default(2),
});

export const roomsController = {
  availabilitySchema,

  async list(_req: Request, res: Response) {
    const rooms = await query(`
      SELECT r.id, r.slug, r.name, r.category, r.short_description,
             r.description, r.base_price, r.currency, r.size_sqm AS size,
             r.max_guests, r.beds, r.view,
             COALESCE(json_agg(DISTINCT jsonb_build_object('url', ri.url, 'alt', ri.alt))
                      FILTER (WHERE ri.id IS NOT NULL), '[]') AS images,
             COALESCE(json_agg(DISTINCT jsonb_build_object(
               'id', rp.id, 'name', rp.name, 'price', rp.price,
               'refundable', rp.refundable, 'prepayment', rp.prepayment_required,
               'breakfastIncluded', rp.breakfast_included, 'description', rp.description))
               FILTER (WHERE rp.id IS NOT NULL), '[]') AS "rateOptions"
        FROM rooms r
        LEFT JOIN room_images ri ON ri.room_id = r.id
        LEFT JOIN rate_plans  rp ON rp.room_id = r.id
       WHERE r.is_active = true
       GROUP BY r.id
       ORDER BY r.display_order, r.name;
    `);
    res.json(rooms.rows);
  },

  async findBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const r = await query(
      `SELECT id, slug, name, category, short_description, description,
              base_price, currency, size_sqm AS size, max_guests, beds, view
         FROM rooms WHERE slug = $1 AND is_active = true`,
      [slug],
    );
    if (!r.rowCount) throw new HttpError(404, "Room not found");
    res.json(r.rows[0]);
  },

  async availability(req: Request, res: Response) {
    const q = req.query as unknown as z.infer<typeof availabilitySchema>;
    if (q.checkOut <= q.checkIn) throw new HttpError(400, "Check-out must be after check-in");
    const data = await getAvailability(q.checkIn, q.checkOut, q.guests);
    res.json(data);
  },
};
