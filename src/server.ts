import * as Express from 'express';
import * as Mongoose from 'mongoose';
import { Config } from './config';
import { PathConfiguration } from './types/definitions';
import { Router } from './routes/main.router';
import * as Morgan from 'morgan';
import * as BodyParser from 'body-parser';


Mongoose.Promise = require('bluebird');
const app = Express();

// Config
app.use(Morgan(Config.server.morgan));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

// Connect to database
const db = Mongoose.connect(Config.mongodb.url, {
    useMongoClient: true
});
app.set('db', db);

function loadPath(config: PathConfiguration) {
    app.use(config.path, config.router);
}

// Routes loading
Router.forEach((pathConfig: PathConfiguration) => {
    loadPath(pathConfig);
});

// start server
app.listen(Config.server.port);
console.log(`Listening on port ${Config.server.port}`);
console.log();