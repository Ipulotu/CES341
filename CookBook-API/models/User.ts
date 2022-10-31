const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  favoriteRecipes: {
    type: Array<typeof ObjectId>,
    required: false,
  },
})

module.exports = mongoose.model('User', UserSchema)