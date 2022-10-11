"use strict";
const CookBookRoutes = require('express').Router();
const cookBook = require("../controllers/recipes");
CookBookRoutes.get('/', cookBook.getAllRecipe);
CookBookRoutes.post('/', cookBook.createRecipe);
module.exports = CookBookRoutes;
