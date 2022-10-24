const OAthRoutes = require('express').Router();
const oAuthController = require('../controllers/OAuth');


/*  PASSPORT SETUP  */
OAthRoutes.get('/', oAuthController.getStart)
// OAthRoutes.get('/success', oAuthController.getSuccess)
OAthRoutes.get('/error', oAuthController.getError)
// OAthRoutes.get('/auth/google', oAuthController.getAuth)
// OAthRoutes.get('/auth/google/callback', oAuthController.getCallback)


module.exports = OAthRoutes