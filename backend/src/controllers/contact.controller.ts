import type { Request, Response } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { sendMail } from "../services/email.service.js";
import { env } from "../config/env.js";

const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().max(180).optional(),
  message: z.string().min(2).max(4000),
});

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const contactController = {
  contactSchema,
  newsletterSchema,

  async submit(req: Request, res: Response) {
    const b = req.body as z.infer<typeof contactSchema>;
    const r = await query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1,$2,$3,$4,$5) RETURNING id, created_at`,
      [b.name, b.email, b.phone ?? null, b.subject ?? "General enquiry", b.message],
    );

    sendMail({
      to: env.MAIL_FROM,
      subject: `New enquiry — ${b.subject ?? "General enquiry"}`,
      html: `<p><b>${b.name}</b> &lt;${b.email}&gt; wrote:</p><blockquote>${b.message}</blockquote>`,
    }).catch(() => null);

    res.status(201).json(r.rows[0]);
  },

  async subscribe(req: Request, res: Response) {
    const b = req.body as z.infer<typeof newsletterSchema>;
    await query(
      `INSERT INTO newsletter_subscribers (email, source) VALUES ($1, 'web')
       ON CONFLICT (email) DO UPDATE SET is_active = true`,
      [b.email],
    );
    res.status(201).json({ ok: true });
  },

  async list(_req: Request, res: Response) {
    const r = await query(
      "SELECT id, name, email, subject, message, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 200",
    );
    res.json(r.rows);
  },
};
