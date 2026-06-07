import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 chars"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  COOKIE_DOMAIN: z.string().default("localhost"),
  COOKIE_SECURE: z.coerce.boolean().default(false),

  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  ADMIN_ORIGIN: z.string().default("http://localhost:3001"),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().default("AZ Hôtel des Arts <noreply@example.com>"),

  UPLOAD_DIR: z.string().default("./uploads"),
  MAX_UPLOAD_MB: z.coerce.number().default(8),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
