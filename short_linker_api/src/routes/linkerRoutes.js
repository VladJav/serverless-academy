import { Router} from "express";
import {createLink, redirectLink} from "../controllers/linkerController.js";

const router = Router();

router.post('/', createLink);
router.get('/:path', redirectLink);

export { router as linkerRouter };