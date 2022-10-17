import { Request, Response, NextFunction } from 'express';
const Recipe = require('../db/recipe')
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');

class CookBook{

  //Function to get all Recipes
  async getAllRecipe(req: Request, res: Response){
    const data = await mongodb.getDb().db("CookBook").collection('Recipes').find();
    data.toArray().then((recipe: typeof Recipe) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(recipe);
    });
  };

  //Function to read a Recipe
  async getRecipe(req: Request, res: Response){
    //valadating id
    if(!valadateId(req.params.id) || req.params.id == null){
      res.status(500).send('Invalied Id')
      return;
    }
    const recipeId = new ObjectId(req.params.id);
      
    const data = await mongodb.getDb().db("CookBook").collection('Recipes').find({ _id: recipeId });
    data.toArray().then((recipes: typeof Recipe) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(recipes[0]);
    });
  }

  //Function to create a Recipe
  async createRecipe(req: Request, res: Response){
    const data = await mongodb.getDb().db("CookBook").collection('Recipes');
    let recipe:typeof Recipe; 

    //valadating id
    if(!valadateStrings(req)){
      res.status(500).send('Incorrect input value')
      return;
    }

    recipe = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      servings: req.body.servings,
      timeToCook: req.body.timeToCook,
      ingredient1: {
        "name": req.body.ingredient1Name,
        "amount": req.body.ingredient1Amount
      }
    }
    recipe = addIngredients(req, recipe)
    
    data.insertOne(recipe)    
      .then((result: any) => {
        console.log(result)
        res.status(201).json(result)
      })
    .catch((error: any) => console.error(error))
  }

  //Function to dealet Recipe
  async deleteRecipe(req: Request, res: Response){
    const data = await mongodb.getDb().db("CookBook").collection('Recipes');

    if(!valadateId(req.params.id)|| req.params.id == null){
      res.status(500).send('Invalied Id')
      return;
    }
    const recipesId = new ObjectId(req.params.id);

    const result = await data.remove({ _id: recipesId }, true)
        console.log(result)
        res.status(200).json(result)
    
  }

  //Function to update a Recipe
  async updateRecipe(req: Request, res: Response){
    //valadating id
    if(!valadateId(req.params.id)|| req.params.id == null){
      res.status(500).send('Invalied Id')
      return;
    }

    const recipeId = new ObjectId(req.params.id);
    const data = await mongodb.getDb().db("CSE341").collection('contacts');
    let recipe:typeof Recipe; 
    
    if(!valadateStrings(req)){
      res.status(500).send('Incorrect input value')
      return;
    }

    recipe = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      servings: req.body.servings,
      timeToCook: req.body.timeToCook,
      ingredient1: {
        "name": req.body.ingredient1Name,
        "amount": req.body.ingredient1Amount
      }
    }
    recipe = addIngredients(req, recipe)


    const response = await data.replaceOne({ _id: recipeId }, Recipe);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };
}

//A function to add ingredients up to the max number. 
function addIngredients(req: Request, recipe:typeof Recipe){
  const MaxIngredient = 30

  for (let i = 2; i <= MaxIngredient; i++) {
    let ingredient = `ingredient${i}`
    let ingredientName = `ingredient${i}Name`
    let ingredientAmount = `ingredient${i}Amount`

    if (req.body[ingredient] != null){
      recipe[ingredient] = {
        "name": req.body[ingredientName],
        "amount": req.body[ingredientAmount]
      }
    }
    else if (req.body[ingredient] == null) {break;}
    else if (i == MaxIngredient ) {console.log("You have reached the max number of ingrdents")}
    else{console.log("error with loading ingredients")}
  } 
  return recipe;
}

//A function to check if the req contains the right datatype of string.
function valadateStrings(req: Request){
  let array: Array<string> = [];
  array.push(req.body.name);
  array.push(req.body.description);
  array.push(req.body.type);
  array.push(req.body.servings);
  array.push(req.body.timeToCook);

  array.forEach(input =>{
    if (typeof input != 'string'){
      console.log(`Error ${input} is not a string`)
      return false;
    }else if (input == null){ 
      console.log('Error input can not be empty')
      return false;
    } 



  })
  return true;
}

//A function to check if the recipeId sent by the user is valid. 
 function valadateId(recipeId: any){
  return mongoose.Types.ObjectId.isValid(recipeId);
 }


let cb = new CookBook();
module.exports = cb;




