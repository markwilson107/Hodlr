const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavoritesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  favorites: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Favorites = mongoose.model('Favorites', FavoritesSchema);

module.exports = Favorites;