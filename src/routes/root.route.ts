import { Router } from 'express'
import { RootController } from '../controllers/root.controller'

const router = Router();
const controller = new RootController();

router.all('/', (req, res) => {
    res.send('Hello')
});

export default {
    path: '/',
    router: router
}