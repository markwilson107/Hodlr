const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HoldingsSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  holdings: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Holdings = mongoose.model('Holdings', HoldingsSchema);

module.exports = Holdings;