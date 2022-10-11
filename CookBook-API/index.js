"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = (0, express_1.default)();
const PORT = 8080;
app
    .use(bodyParser.json())
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
    .use('/', require('./routes'));
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(PORT);
        console.log(`Connected to DB and listening on ${PORT}`);
    }
});
