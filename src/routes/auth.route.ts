import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.controller";
import { validateRequestBody } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../validations/auth.schema";

const router = Router();

router.post('/auth/register', validateRequestBody(registerSchema), registerController);
router.post('/auth/login', validateRequestBody(loginSchema), loginController);
// router.post('/auth/logout');

export default router;