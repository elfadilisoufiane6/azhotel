import { Router } from "express";
import { bookingsController } from "../controllers/bookings.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.post("/",                  validate(bookingsController.createSchema), asyncHandler(bookingsController.create));
r.get ("/",                  requireRole("staff","manager","admin"),    asyncHandler(bookingsController.list));
r.get ("/:reference",                                                    asyncHandler(bookingsController.findByReference));
r.patch("/:id/status",       requireRole("staff","manager","admin"),    asyncHandler(bookingsController.updateStatus));

export default r;
