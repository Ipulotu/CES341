const routes = require('express').Router();
const {getAll, getContact, createContact, deleteContact, updateContact} = require("../controllers/contacts");


routes.get('/', getAll);

routes.get('/:id', getContact);

routes.post('/', createContact);

routes.delete('/:id', deleteContact);

routes.put('/:id', updateContact);

module.exports = routes