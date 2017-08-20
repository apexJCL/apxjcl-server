# Routes
There are two kind of files:

+ *.router.ts
+ *.route.ts

## router.ts
These files are in charge of defining a grouping of multiple routers into a single one. For
example, we can look at the `api.router.ts` source:

```typescript
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
```

Here we can see that we define a parent `Router` that will have the path `/api`, thus
grouping all the siblings under this path. Then we tell the `apiRouter`to use our other
routers to append the routes.

## route.ts
These files explicitly bind the routes with the controller specific actions, thus this are
in control of who does what. For example, checking auth routes:

```typescript
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
```

Here we are loading a `Controller` that contains all the actions that will take place
given an specific path. Here you do all the basic linking of `route => action`.

This gives us a *virtually split* route management, where you can load middleware as it's
seen here, where the first routes are *unguarded* from the `AuthMiddleware`, whereas the
route `/me` will be protected by that middleware that checks for a valid **JWT** to access
the resource.

Finally, like in the `router.ts`files, we define a default export were we specify the base
path for this router and the router itself.

## main.router.ts
This one just groups the **routers** into an array so that the server file can load all
into the app with this simple function:

```typescript
function loadPath(config: PathConfiguration) {
    app.use(config.path, config.router);
}

// Routes loading
Router.forEach((pathConfig: PathConfiguration) => {
    loadPath(pathConfig);
});
```