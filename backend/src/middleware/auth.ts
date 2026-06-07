import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import { HttpError } from "./errorHandler.js";

export type AuthPayload = {
  sub: string;        // user id
  email: string;
  role: "guest" | "staff" | "manager" | "admin";
};

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload;
  }
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

export function authOptional(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.az_session as string | undefined;
  if (!token) return next();
  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
  } catch {
    /* ignore – treat as anonymous */
  }
  next();
}

export function authRequired(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) throw new HttpError(401, "Authentication required");
  next();
}

export function requireRole(...roles: AuthPayload["role"][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new HttpError(401, "Authentication required");
    if (!roles.includes(req.user.role)) throw new HttpError(403, "Forbidden");
    next();
  };
}

export function setSessionCookie(res: Response, token: string) {
  res.cookie("az_session", token, {
    httpOnly: true,
    secure:   env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? "none" : "lax",
    domain:   env.COOKIE_DOMAIN,
    path:     "/",
    maxAge:   1000 * 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie("az_session", { domain: env.COOKIE_DOMAIN, path: "/" });
}
