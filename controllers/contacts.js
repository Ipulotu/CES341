const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

async function getAll(req, res, next){
  const data = await mongodb.getDb().db("CSE341").collection('contacts').find();
  data.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};


//Function to read a contact
async function getContact(req, res, next){
    const userId = new ObjectId(req.params.id);
    const data = await mongodb.getDb().db("CSE341").collection('contacts').find({ _id: userId });
    data.toArray().then((contact) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact[0]);
      });
}


//Function to create a contact
async function createContact(req, res){
  const data = await mongodb.getDb().db("CSE341").collection('contacts');
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  data.insertOne(contact)    
    .then(result => {
      console.log(result)
      res.status(201).json(result)
    })
  .catch(error => console.error(error))
}

//Function to dealet contact
async function deleteContact(req, res){
  const data = await mongodb.getDb().db("CSE341").collection('contacts');
  const userId = new ObjectId(req.params.id);

  const result = await data.remove({ _id: userId }, true)
      console.log(result)
      res.status(200).json(result)
   

}



//Function to update a contact
async function updateContact(req, res){
  const userId = new ObjectId(req.params.id);
  const data = await mongodb.getDb().db("CSE341").collection('contacts');
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await data.replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};



module.exports = {getAll, getContact, createContact, deleteContact, updateContact}
