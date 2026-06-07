import { Router } from "express";
import { reviewsController } from "../controllers/reviews.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.get   ("/",                                                       asyncHandler(reviewsController.list));
r.post  ("/",        validate(reviewsController.createSchema),      asyncHandler(reviewsController.create));
r.patch ("/:id/publish", requireRole("manager","admin"),            asyncHandler(reviewsController.publish));
r.delete("/:id",         requireRole("manager","admin"),            asyncHandler(reviewsController.delete));

export default r;
