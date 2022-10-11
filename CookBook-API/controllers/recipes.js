"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe = require('../db/recipe');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
class CookBook {
    getAllRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mongodb.getDb().db("CookBook").collection('Recipes').find();
            data.toArray().then((recipe) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(recipe);
            });
        });
    }
    ;
    //Function to read a contact
    getRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = new ObjectId(req.params.id);
            const data = yield mongodb.getDb().db("CookBook").collection('Recipes').find({ _id: userId });
            data.toArray().then((recipes) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(recipes[0]);
            });
        });
    }
    //Function to create a contact
    createRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mongodb.getDb().db("CookBook").collection('Recipes');
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
            };
            data.insertOne(Recipe)
                .then((result) => {
                console.log(result);
                res.status(201).json(result);
            })
                .catch((error) => console.error(error));
        });
    }
    //Function to dealet contact
    deleteRecipe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mongodb.getDb().db("CookBook").collection('Recipes');
            const recipesId = new ObjectId(req.params.id);
            const result = yield data.remove({ _id: recipesId }, true);
            console.log(result);
            res.status(200).json(result);
        });
    }
}
let cb = new CookBook();
module.exports = cb;
