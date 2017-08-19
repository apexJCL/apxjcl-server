import * as Express from 'express'
import { Config } from './config'
import { PathConfiguration } from './types/definitions';
import { Router } from './routes/main.router';

const app = Express();

function loadPath(config: PathConfiguration) {
    app.use(config.path, config.router);
}

Router.forEach((pathConfig: PathConfiguration) => {
    loadPath(pathConfig);
});

// start server
app.listen(Config.server.port);
console.log(`Listening on port ${Config.server.port}`);
console.log();