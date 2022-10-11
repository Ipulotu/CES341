const swaggerRoutes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

swaggerRoutes.use('/api-docs', swaggerUi.serve);
swaggerRoutes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = swaggerRoutes;