const dotenv = require("dotenv")
dotenv.config()
const { MongoClient} = require('mongodb');


let _db;

//function to initialize connect to MongoDB
const initDb = callback => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.DB_URI)
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};


//function to get connection to MongoDB if alrady initialize. 
const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};


module.exports = {
  initDb,
  getDb
};
