import { Router } from "express";
import { registerController } from "../controllers/auth.controller";
import { validateRequestBody } from "../middlewares/validation.middleware";
import { registerSchema } from "../validations/auth.schema";

const router = Router();

router.post('/auth/register', validateRequestBody(registerSchema), registerController);
// router.post('/auth/login');
// router.post('/auth/logout');

export default router;