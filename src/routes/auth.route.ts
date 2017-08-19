import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const controller = new AuthController();

router.route('/signup')
    .post(controller.signup);

router.route('/login')
    .post(controller.login);

export default {
    path: '/auth',
    router: router
}