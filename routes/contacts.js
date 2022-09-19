const routes = require('express').Router();
const {getAll, getContact} = require("../controllers/contacts");


routes.get('/', getAll);

routes.get('/:id', getContact);


module.exports = routes