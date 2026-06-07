import type { Request, Response } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";

const upsertSchema = z.object({
  slug:        z.string().min(2),
  title:       z.string().min(2),
  excerpt:     z.string().min(2),
  body:        z.string().min(2),
  coverImage:  z.string().url().or(z.string().startsWith("/")),
  author:      z.string().min(2),
  categoryId:  z.string().uuid().optional(),
  tags:        z.array(z.string()).default([]),
  readTime:    z.coerce.number().int().min(1).max(60).default(5),
  isPublished: z.boolean().default(true),
});

export const blogController = {
  upsertSchema,

  async list(req: Request, res: Response) {
    const category = String(req.query.category ?? "");
    const q        = String(req.query.q ?? "");
    const params: unknown[] = [];
    const where: string[] = ["bp.is_published = true"];
    if (category) {
      params.push(category);
      where.push(`c.slug = $${params.length}`);
    }
    if (q) {
      params.push(`%${q}%`);
      where.push(`(bp.title ILIKE $${params.length} OR bp.excerpt ILIKE $${params.length})`);
    }
    const r = await query(
      `SELECT bp.id, bp.slug, bp.title, bp.excerpt, bp.cover_image AS "coverImage",
              bp.author, bp.read_time AS "readTime", bp.tags,
              bp.published_at AS "publishedAt",
              c.name AS category
         FROM blog_posts bp
         LEFT JOIN categories c ON c.id = bp.category_id
         WHERE ${where.join(" AND ")}
         ORDER BY bp.published_at DESC NULLS LAST
         LIMIT 60`,
      params,
    );
    res.json(r.rows);
  },

  async findBySlug(req: Request, res: Response) {
    const r = await query(
      `SELECT bp.*, c.name AS category
         FROM blog_posts bp
         LEFT JOIN categories c ON c.id = bp.category_id
        WHERE bp.slug = $1 AND bp.is_published = true`,
      [req.params.slug],
    );
    if (!r.rowCount) throw new HttpError(404, "Article not found");
    res.json(r.rows[0]);
  },

  async create(req: Request, res: Response) {
    const b = req.body as z.infer<typeof upsertSchema>;
    const r = await query(
      `INSERT INTO blog_posts
        (slug, title, excerpt, body, cover_image, author, category_id, tags, read_time, is_published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, CASE WHEN $10 THEN now() ELSE NULL END)
       RETURNING id, slug`,
      [b.slug, b.title, b.excerpt, b.body, b.coverImage, b.author, b.categoryId ?? null, b.tags, b.readTime, b.isPublished],
    );
    res.status(201).json(r.rows[0]);
  },
};
