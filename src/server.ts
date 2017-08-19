import * as Express from 'express'
import { Config } from './config'
import { Request, Response } from 'express';

const app = Express();

app.route('/')
    .all((req: Request, res: Response) => {
        res.send('Jello');
    });

app.listen(Config.server.port);
console.log(`Listening on port ${Config.server.port}`);