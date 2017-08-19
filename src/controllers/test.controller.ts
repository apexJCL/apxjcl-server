import { Request, Response } from 'express';

export class TestController {
    index(req: Request, res: Response) {
        res.send('Hello from Test')
    }
}