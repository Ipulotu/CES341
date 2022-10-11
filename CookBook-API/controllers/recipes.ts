import { Request, Response, NextFunction } from 'express';
const Recipe = require('../db/recipe')
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



class CookBook{

  async getAllRecipe(req: Request, res: Response){
    const data = await mongodb.getDb().db("CookBook").collection('Recipes').find();
    data.toArray().then((recipe: typeof Recipe) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(recipe);
    });
  };


  //Function to read a contact
  async getRecipe(req: Request, res: Response){
      const userId = new ObjectId(req.params.id);
      const data = await mongodb.getDb().db("CookBook").collection('Recipes').find({ _id: userId });
      data.toArray().then((recipes: typeof Recipe) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(recipes[0]);
        });
  }


  //Function to create a contact
  async createRecipe(req: Request, res: Response){
    const data = await mongodb.getDb().db("CookBook").collection('Recipes');
    const Recipe = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    servings: req.body.servings,
    timeToCook: req.body.timeToCook,
    ingredient1: {
      "name": req.body.ingredient1Name,
      "amount": req.body.ingredient1Amount
    },
    ingredient2: {
      "name": req.body.ingredient2Name,
      "amount": req.body.ingredient2Amount
    }


    }
    data.insertOne(Recipe)    
      .then((result: any) => {
        console.log(result)
        res.status(201).json(result)
      })
    .catch((error: any) => console.error(error))
  }

// //Function to dealet contact
// async function deleteContact(req, res){
//   const data = await mongodb.getDb().db("CSE341").collection('contacts');
//   const userId = new ObjectId(req.params.id);

//   const result = await data.remove({ _id: userId }, true)
//       console.log(result)
//       res.status(200).json(result)
   

// }



// //Function to update a contact
// async function updateContact(req, res){
//   const userId = new ObjectId(req.params.id);
//   const data = await mongodb.getDb().db("CSE341").collection('contacts');
//   const contact = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     favoriteColor: req.body.favoriteColor,
//     birthday: req.body.birthday
//   };

//   const response = await data.replaceOne({ _id: userId }, contact);
//   console.log(response);
//   if (response.modifiedCount > 0) {
//     res.status(204).send();
//   } else {
//     res.status(500).json(response.error || 'Some error occurred while updating the contact.');
//   }
// };

}

let cb = new CookBook();
module.exports = cb;




