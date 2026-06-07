import { Router } from "express";
import { galleryController } from "../controllers/gallery.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.get   ("/",     asyncHandler(galleryController.list));
r.post  ("/",     requireRole("manager","admin"), validate(galleryController.createSchema), asyncHandler(galleryController.create));
r.delete("/:id",  requireRole("manager","admin"), asyncHandler(galleryController.delete));

export default r;
