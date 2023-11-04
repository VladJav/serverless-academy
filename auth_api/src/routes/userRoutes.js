import {Router} from "express";
import {showMe} from "../controllers/userController.js";
import {authenticateUser} from "../middleware/authenticateUser.js";

const router = Router();

router.get('/me', authenticateUser, showMe);

export { router as userRouter };