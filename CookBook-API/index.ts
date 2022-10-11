import express from 'express';
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const PORT = 8080;



app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));



mongodb.initDb((err:any) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT);
        console.log(`Connected to DB and listening on ${PORT}`);
    }
});