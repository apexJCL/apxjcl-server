import { Router } from "express"
import AuthRouter from './auth.route'
import EntryRouter from './entry.route'

const apiRouter = Router();

// Route loading
apiRouter.use(AuthRouter.path, AuthRouter.router);
apiRouter.use(EntryRouter.path, EntryRouter.router);

export default {
    path: '/api',
    router: apiRouter
}