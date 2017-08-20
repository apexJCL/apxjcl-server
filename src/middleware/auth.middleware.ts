import { NextFunction, Request, Response } from 'express'
import { JWTHandler } from '../utils/jwt.generator'

class AuthMiddleware {
    static tokenAuth(req: Request, res: Response, next: NextFunction) {
        let token = req.header('Authorization') || req.param('token') || null;
        if (!token) {
            return res.status(401).send('Unauthorized');
        }
        token = token.substr(7); // Removes Bearer_
        try {
            const decoded = JWTHandler.parse(token);
            req.app.set('currentUser', decoded);
            next();
        } catch (e) {
            return res.send({
                success: false,
                message: 'Invalid token'
            });
        }
    }
}

export { AuthMiddleware }