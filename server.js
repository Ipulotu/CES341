const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const express = require('express')
const app = express()
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
