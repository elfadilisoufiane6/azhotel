import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";

const r = Router();

r.post("/", validate(contactController.newsletterSchema), asyncHandler(contactController.subscribe));

export default r;
