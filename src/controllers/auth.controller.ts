import { Request, Response } from 'express'
import { User } from '../models/user.model';

export class AuthController {
    /**
     * Signs up a user
     * @param {Request} req
     * @param {e.Response} res
     */
    signup(req: Request, res: Response) {
        User.findOne({
            username: req.body.username
        }).then(u => {
            if (u)
                return res.json({
                    success: false,
                    message: 'User does exists'
                });
            const newUser = new User(req.body);
            newUser.save()
                .then(s => {
                    res.json({success: true, s});
                })
                .catch(e => {
                    res.send(e);
                })
        }).catch(e => {
            return res.send(e);
        });
    }

    /**
     * Logs a user in
     * @param {Request} req
     * @param {e.Response} res
     */
    login(req: Request, res: Response) {
        User.findOne({username: req.body.username})
            .then((u: any) => {
                u.checkPassword(req.body.password)
                    .then((check: boolean) => {
                        if (!check) return res.json({success: false, message: 'Wrong password dude'});
                        return res.json({
                            success: true,
                            token: u.generateToken()
                        });
                    })
                    .catch((err: any) => {
                        res.send(err)
                    })
            })
            .catch(e => {
                res.json({success: false, error: e})
            })
    }

    me (req: Request, res: Response) {
        res.send(req.app.get('currentUser'));
    }
}