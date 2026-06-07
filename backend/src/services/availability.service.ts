import { query } from "../config/db.js";

export type AvailabilityRow = {
  room_id: string;
  slug: string;
  name: string;
  base_price: number;
  total_inventory: number;
  booked: number;
  available: number;
};

/**
 * Returns available inventory per room for the given window.
 * A booking is "blocking" if it has status in (pending, confirmed, checked_in)
 * AND its window overlaps the requested window.
 */
export async function getAvailability(checkIn: string, checkOut: string, guests = 1) {
  const r = await query<AvailabilityRow>(
    `
    WITH conflicts AS (
      SELECT b.room_id, COUNT(*)::int AS booked
        FROM bookings b
       WHERE b.status IN ('pending','confirmed','checked_in')
         AND b.check_in  < $2::date
         AND b.check_out > $1::date
       GROUP BY b.room_id
    )
    SELECT r.id            AS room_id,
           r.slug, r.name, r.base_price, r.total_inventory,
           COALESCE(c.booked, 0)                              AS booked,
           GREATEST(r.total_inventory - COALESCE(c.booked, 0), 0) AS available
      FROM rooms r
      LEFT JOIN conflicts c ON c.room_id = r.id
     WHERE r.is_active = true
       AND r.max_guests >= $3
    ORDER BY r.display_order, r.name
    `,
    [checkIn, checkOut, guests],
  );
  return r.rows;
}
