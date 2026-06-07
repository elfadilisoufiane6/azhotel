import type { Request, Response } from "express";
import { query } from "../config/db.js";

export const dashboardController = {
  async overview(_req: Request, res: Response) {
    const [bookings, revenue, occupancy, recent] = await Promise.all([
      query<{ status: string; n: number }>(
        `SELECT status, COUNT(*)::int AS n FROM bookings GROUP BY status`,
      ),
      query<{ month: string; revenue: number }>(
        `SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS month,
                COALESCE(SUM(total_amount), 0)::numeric AS revenue
           FROM bookings
          WHERE status IN ('confirmed','checked_in','checked_out')
            AND created_at > now() - interval '12 months'
          GROUP BY 1
          ORDER BY 1`,
      ),
      query<{ available: number; total: number }>(
        `SELECT COALESCE(SUM(total_inventory), 0)::int AS total,
                COALESCE(SUM(total_inventory), 0)::int
                  - COALESCE((
                      SELECT COUNT(*)::int FROM bookings
                       WHERE status IN ('confirmed','checked_in')
                         AND check_in <= CURRENT_DATE
                         AND check_out > CURRENT_DATE
                    ), 0) AS available
           FROM rooms WHERE is_active`,
      ),
      query(
        `SELECT b.id, b.reference, b.guest_first_name, b.guest_last_name, b.guest_email,
                b.status, b.check_in, b.check_out, b.total_amount,
                r.name AS room_name
           FROM bookings b JOIN rooms r ON r.id = b.room_id
          ORDER BY b.created_at DESC LIMIT 8`,
      ),
    ]);

    const total = occupancy.rows[0]?.total ?? 0;
    const taken = total - (occupancy.rows[0]?.available ?? total);

    res.json({
      bookingsByStatus: bookings.rows,
      revenueByMonth:   revenue.rows,
      occupancy: { total, occupied: taken, pct: total ? (taken / total) * 100 : 0 },
      recentBookings:   recent.rows,
    });
  },
};
