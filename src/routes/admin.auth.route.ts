import { Router } from "express";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/admin.auth.controller";
import { validateRequestBody } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.schema";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', validateRequestBody(registerSchema), registerController);
router.post('/login', validateRequestBody(loginSchema), loginController);
router.post('/logout', isAuthenticated, logoutController);
router.post('/refresh_token', refreshTokenController)

export default router;