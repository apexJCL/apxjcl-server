import { Router } from 'express'
import { RootController } from '../controllers/root.controller'

const router = Router();
const controller = new RootController();

router.all('/', controller.index);

export default {
    path: '/',
    router: router
}