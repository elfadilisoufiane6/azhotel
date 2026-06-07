import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate, asyncHandler } from "../middleware/validate.js";
import { authRequired } from "../middleware/auth.js";

const r = Router();

r.post("/register", validate(authController.registerSchema), asyncHandler(authController.register));
r.post("/login",    validate(authController.loginSchema),    asyncHandler(authController.login));
r.post("/logout",                                            asyncHandler(async (req, res) => authController.logout(req, res)));
r.get ("/me",       authRequired,                            asyncHandler(authController.me));

export default r;
