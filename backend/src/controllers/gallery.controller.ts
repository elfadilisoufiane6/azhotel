import type { Request, Response } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";

const createSchema = z.object({
  url:      z.string(),
  alt:      z.string(),
  category: z.string(),
  width:    z.coerce.number().int().min(1),
  height:   z.coerce.number().int().min(1),
  displayOrder: z.coerce.number().int().default(0),
});

export const galleryController = {
  createSchema,

  async list(req: Request, res: Response) {
    const category = String(req.query.category ?? "");
    const params: unknown[] = [];
    const where: string[]   = ["is_published = true"];
    if (category && category !== "All") {
      params.push(category.toLowerCase());
      where.push(`category = $${params.length}`);
    }
    const r = await query(
      `SELECT id, url, alt, category, width, height
         FROM gallery_images
        WHERE ${where.join(" AND ")}
        ORDER BY display_order, created_at DESC`,
      params,
    );
    res.json(r.rows);
  },

  async create(req: Request, res: Response) {
    const b = req.body as z.infer<typeof createSchema>;
    const r = await query(
      `INSERT INTO gallery_images (url, alt, category, width, height, display_order)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      [b.url, b.alt, b.category, b.width, b.height, b.displayOrder],
    );
    res.status(201).json(r.rows[0]);
  },

  async delete(req: Request, res: Response) {
    const r = await query("DELETE FROM gallery_images WHERE id = $1 RETURNING id", [req.params.id]);
    if (!r.rowCount) throw new HttpError(404, "Image not found");
    res.status(204).end();
  },
};
