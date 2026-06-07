import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { isProd } from "../config/env.js";

export class HttpError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
  }
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", details: err.flatten() });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  console.error(`[${req.method} ${req.path}]`, err);
  res.status(500).json({
    error: "Internal server error",
    ...(isProd ? {} : { trace: err instanceof Error ? err.stack : String(err) }),
  });
}
