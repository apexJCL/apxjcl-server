import { Request, Response } from 'express'

export class RootController {
    index(req: Request, res: Response) {
        res.send('Hello from root');
    }
}