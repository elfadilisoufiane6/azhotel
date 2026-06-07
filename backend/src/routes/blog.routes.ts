import { Router } from "express";
import { blogController } from "../controllers/blog.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.get ("/",        asyncHandler(blogController.list));
r.get ("/:slug",   asyncHandler(blogController.findBySlug));
r.post("/",        requireRole("manager","admin"), validate(blogController.upsertSchema), asyncHandler(blogController.create));

export default r;
