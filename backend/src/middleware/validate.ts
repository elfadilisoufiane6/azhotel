import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

type Source = "body" | "query" | "params";

export function validate<T>(schema: ZodSchema<T>, source: Source = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) return next(parsed.error);
    // Replace with parsed (sanitized + coerced) data
    (req as unknown as Record<string, unknown>)[source] = parsed.data;
    next();
  };
}

export function asyncHandler<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
