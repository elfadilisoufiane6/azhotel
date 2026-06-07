import { Router } from "express";
import { roomsController } from "../controllers/rooms.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";

const r = Router();

r.get("/availability",
  validate(roomsController.availabilitySchema, "query"),
  asyncHandler(roomsController.availability));

r.get("/",          asyncHandler(roomsController.list));
r.get("/:slug",     asyncHandler(roomsController.findBySlug));

export default r;
