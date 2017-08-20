import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { EntryController } from "../controllers/entry.controller";

const router = Router();
const controller = new EntryController();

// Guards my routes, yo
router.use(AuthMiddleware.tokenAuth);

router.route('/')
    .post(controller.addEntry);

export default {
    path: '/entry',
    router
}