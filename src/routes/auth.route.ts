import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

router.route('/signup')
    .post(controller.signup);

router.route('/login')
    .post(controller.login);

// Just place it where you want it to
router.use(AuthMiddleware.tokenAuth);

router.route('/me')
    .all(controller.me);

export default {
    path: '/auth',
    router: router
}