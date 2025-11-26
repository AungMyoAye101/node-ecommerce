import { Router } from "express";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controller";
import { validateRequestBody } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.schema";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post('/auth/register', validateRequestBody(registerSchema), registerController);
router.post('/auth/login', validateRequestBody(loginSchema), loginController);
router.post('/auth/logout', isAuthenticated, logoutController);
router.post('/auth/refresh_token', refreshTokenController)


export default router;