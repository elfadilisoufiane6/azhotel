import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.post("/",        validate(contactController.contactSchema),    asyncHandler(contactController.submit));
r.get ("/",        requireRole("staff","manager","admin"),       asyncHandler(contactController.list));

export default r;
