import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";
import { asyncHandler } from "../middleware/validate.js";
import { requireRole } from "../middleware/auth.js";

const r = Router();

r.get("/overview", requireRole("manager","admin"), asyncHandler(dashboardController.overview));

export default r;
