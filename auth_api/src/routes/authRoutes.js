import { Router } from "express";
import {signIn, signUp} from "../controllers/authController.js";

const router = Router();

router.post('/sign-in', signIn);

router.post('/sign-up', signUp);

export { router as authRouter };