const OAthRoutes = require('express').Router();
const oAuthController = require('../controllers/OAuth');


/*  PASSPORT SETUP  */
OAthRoutes.get('/', oAuthController.getStart)

// OAthRoutes.get('/success', oAuthController.getSuccess)
OAthRoutes.get('/error', oAuthController.getError)

//Sending user to google for authentication
OAthRoutes.get('/auth/google', oAuthController.getGoogleAuth);
 
//Callback url
OAthRoutes.get('/auth/google/callback', oAuthController.returnGoogleAuth, oAuthController.redirectSuccess);


module.exports = OAthRoutes