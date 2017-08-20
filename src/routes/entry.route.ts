import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { EntryController } from "../controllers/entry.controller";

const router = Router();
const controller = new EntryController();

router.route('/')
    .get(controller.getEntries)
    .post(AuthMiddleware.tokenAuth, controller.addEntry);

router.route('/:entryId')
    .get(controller.getEntry);

export default {
    path: '/entry',
    router
}