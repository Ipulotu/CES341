const dotenv = require("dotenv")
dotenv.config()
const { MongoClient} = require('mongodb');

//declering _db var
let _db: typeof MongoClient;

//function to initialize connect to MongoDB
const initDb = (callback: any) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.DB_URI)
    .then((client: any) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err: any)  => {
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




