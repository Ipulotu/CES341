const CookBookRoutes = require('express').Router();
const cookBook = require("../controllers/recipes");

CookBookRoutes.get('/',  cookBook.getAllRecipe);
CookBookRoutes.get('/:id',  cookBook.getRecipe);
CookBookRoutes.post('/', cookBook.createRecipe);
CookBookRoutes.delete('/:id', cookBook.deleteRecipe);

module.exports = CookBookRoutes