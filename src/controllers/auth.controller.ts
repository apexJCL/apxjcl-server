import { Request, Response } from 'express'
import { User } from '../models/user.model';

export class AuthController {
    signup(req: Request, res: Response) {
        new User(req.body)
            .save()
            .then(u => {
                res.send(u)
            })
            .catch(e => {
                res.send(e)
            })
    }

    login(req: Request, res: Response) {
        User.findOne({ username: req.body.username })
            .then((u: any) => {
                u.checkPassword(req.body.password)
                    .then((r: boolean) => {
                        if (r) return res.json({
                            success: true,
                            token: 'abc123'
                        });
                        return res.json({
                            success: false,
                            message: 'wrong pass bro'
                        });
                    })
                    .catch((e: any) => {
                        return res.json(e);
                    });
            })
            .catch(e => {
                res.send(e)
            })
    }
}