import { Router } from "express";
import { z } from "zod";
import { query } from "../config/db.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { authRequired } from "../middleware/auth.js";

const r = Router();

const createSchema = z.object({
  bookingId: z.string().uuid(),
  provider:  z.enum(["stripe", "cmi", "manual"]),
  amount:    z.coerce.number().positive(),
  currency:  z.string().length(3).default("MAD"),
});

// Create a payment intent (placeholder — connect Stripe/CMI here)
r.post("/intent", authRequired, validate(createSchema), asyncHandler(async (req, res) => {
  const b = req.body as z.infer<typeof createSchema>;
  const result = await query(
    `INSERT INTO payments (booking_id, provider, amount, currency, status)
     VALUES ($1,$2,$3,$4,'pending') RETURNING id`,
    [b.bookingId, b.provider, b.amount, b.currency],
  );
  // In production: create Stripe PaymentIntent or CMI request here and return client secret.
  res.status(201).json({ id: result.rows[0].id, clientSecret: "demo-secret" });
}));

// Provider webhook (Stripe/CMI). Stub — verify signatures in production.
r.post("/webhook", asyncHandler(async (req, res) => {
  const { paymentId, status } = req.body as { paymentId: string; status: string };
  await query(
    "UPDATE payments SET status = $2, paid_at = CASE WHEN $2 = 'captured' THEN now() ELSE paid_at END WHERE id = $1",
    [paymentId, status],
  );
  res.json({ received: true });
}));

export default r;
