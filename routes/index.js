const routes = require('express').Router();
const { send } = require("../controllers/index");

routes.get('/', send)

module.exports = routes