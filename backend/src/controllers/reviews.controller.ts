import type { Request, Response } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";

const createSchema = z.object({
  authorName:  z.string().min(2),
  country:     z.string().optional(),
  countryCode: z.string().length(2).optional(),
  score:       z.coerce.number().min(0).max(10),
  title:       z.string().max(180).optional(),
  body:        z.string().min(10).max(4000),
  travelType:  z.string().optional(),
  stayDate:    z.string().optional(),
});

export const reviewsController = {
  createSchema,

  async list(_req: Request, res: Response) {
    const r = await query(
      `SELECT id, author_name AS name, country, country_code AS "countryCode",
              score, title, body, travel_type AS "travelType", stay_date AS "stayDate",
              created_at AS "createdAt"
         FROM reviews
        WHERE is_published = true
        ORDER BY created_at DESC
        LIMIT 50`,
    );
    res.json(r.rows);
  },

  async create(req: Request, res: Response) {
    const b = req.body as z.infer<typeof createSchema>;
    const r = await query(
      `INSERT INTO reviews
         (author_name, country, country_code, score, title, body, travel_type, stay_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, created_at`,
      [b.authorName, b.country ?? null, b.countryCode ?? null, b.score, b.title ?? null, b.body, b.travelType ?? null, b.stayDate ?? null],
    );
    res.status(201).json(r.rows[0]);
  },

  async publish(req: Request, res: Response) {
    const { id } = req.params;
    const r = await query(
      "UPDATE reviews SET is_published = true WHERE id = $1 RETURNING id, is_published",
      [id],
    );
    if (!r.rowCount) throw new HttpError(404, "Review not found");
    res.json(r.rows[0]);
  },

  async delete(req: Request, res: Response) {
    const r = await query("DELETE FROM reviews WHERE id = $1 RETURNING id", [req.params.id]);
    if (!r.rowCount) throw new HttpError(404, "Review not found");
    res.status(204).end();
  },
};
