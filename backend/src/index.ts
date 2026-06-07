import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import { env, isProd } from "./config/env.js";
import { authOptional } from "./middleware/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import authRoutes        from "./routes/auth.routes.js";
import roomsRoutes       from "./routes/rooms.routes.js";
import bookingsRoutes    from "./routes/bookings.routes.js";
import reviewsRoutes     from "./routes/reviews.routes.js";
import blogRoutes        from "./routes/blog.routes.js";
import galleryRoutes     from "./routes/gallery.routes.js";
import contactRoutes     from "./routes/contact.routes.js";
import newsletterRoutes  from "./routes/newsletter.routes.js";
import dashboardRoutes   from "./routes/dashboard.routes.js";
import paymentsRoutes    from "./routes/payments.routes.js";

const app = express();

// ── Security ──────────────────────────────────────────────────────────────
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: isProd ? undefined : false,
}));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

const allowed = new Set([env.FRONTEND_ORIGIN, env.ADMIN_ORIGIN].filter(Boolean));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.has(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(morgan(isProd ? "combined" : "dev"));
app.use(authOptional);

// ── Rate limiting ─────────────────────────────────────────────────────────
const globalLimit = rateLimit({ windowMs: 60_000, max: 300, standardHeaders: true, legacyHeaders: false });
const authLimit   = rateLimit({ windowMs: 60_000, max: 10,  message: { error: "Too many attempts" } });
app.use(globalLimit);

// ── Static uploads ────────────────────────────────────────────────────────
app.use("/uploads", express.static(env.UPLOAD_DIR));

// ── Health ────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ ok: true, name: "az-hotel-api", time: new Date().toISOString() }));

// ── Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth",       authLimit, authRoutes);
app.use("/api/rooms",                  roomsRoutes);
app.use("/api/bookings",               bookingsRoutes);
app.use("/api/reviews",                reviewsRoutes);
app.use("/api/blog",                   blogRoutes);
app.use("/api/gallery",                galleryRoutes);
app.use("/api/contact",                contactRoutes);
app.use("/api/newsletter",             newsletterRoutes);
app.use("/api/dashboard",              dashboardRoutes);
app.use("/api/payments",               paymentsRoutes);

// ── 404 + Errors ──────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`✨ AZ Hôtel API ready at http://localhost:${env.PORT}`);
});

function shutdown(signal: string) {
  console.log(`\n${signal} received, shutting down…`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));
