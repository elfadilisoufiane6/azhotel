import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { query } from "../config/db.js";
import { HttpError } from "../middleware/errorHandler.js";
import { signToken, setSessionCookie, clearSessionCookie } from "../middleware/auth.js";

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName:  z.string().min(1),
  email:     z.string().email(),
  password:  z.string().min(8).max(72),
  newsletter: z.boolean().optional(),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

export const authController = {
  registerSchema,
  loginSchema,

  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password, newsletter } = req.body as z.infer<typeof registerSchema>;

    const exists = await query("SELECT 1 FROM users WHERE email = $1", [email]);
    if (exists.rowCount) throw new HttpError(409, "Email already registered");

    const hash = await bcrypt.hash(password, 12);
    const r = await query<{ id: string; email: string; role: "guest" }>(
      `INSERT INTO users (email, password_hash, first_name, last_name, newsletter_opt)
       VALUES ($1,$2,$3,$4,$5) RETURNING id, email, role`,
      [email, hash, firstName, lastName, !!newsletter],
    );

    const u = r.rows[0];
    const token = signToken({ sub: u.id, email: u.email, role: u.role });
    setSessionCookie(res, token);
    res.status(201).json({ id: u.id, email: u.email, role: u.role });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as z.infer<typeof loginSchema>;

    const r = await query<{ id: string; email: string; role: "guest" | "staff" | "manager" | "admin"; password_hash: string }>(
      "SELECT id, email, role, password_hash FROM users WHERE email = $1",
      [email],
    );
    const user = r.rows[0];
    if (!user) throw new HttpError(401, "Invalid email or password");

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new HttpError(401, "Invalid email or password");

    await query("UPDATE users SET last_login_at = now() WHERE id = $1", [user.id]);

    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    setSessionCookie(res, token);
    res.json({ id: user.id, email: user.email, role: user.role });
  },

  async me(req: Request, res: Response) {
    if (!req.user) throw new HttpError(401, "Not authenticated");
    const r = await query(
      "SELECT id, email, first_name, last_name, role, loyalty_tier, created_at FROM users WHERE id = $1",
      [req.user.sub],
    );
    if (!r.rowCount) throw new HttpError(404, "User not found");
    res.json(r.rows[0]);
  },

  logout(_req: Request, res: Response) {
    clearSessionCookie(res);
    res.status(204).end();
  },
};
