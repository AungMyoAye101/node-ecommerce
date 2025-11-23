import { Router } from "express";
import { registerController } from "../controllers/auth.controller";

const router = Router();

router.post('/auth/register', registerController);
router.post('/auth/login');
router.post('/auth/logout');

export default router;