const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getAll(req, res, next){
  const data = await mongodb.getDb().db("CSE341").collection('contacts').find();
  data.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

async function getContact(req, res, next){
    const userId = new ObjectId(req.params.id);
    const data = await mongodb.getDb().db("CSE341").collection('contacts').find({ _id: userId });
    data.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
      });
}

module.exports = {getAll, getContact}
