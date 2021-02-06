const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PairSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  base: {
      type: Object,
      required: true
  },
  quote: {
      type: Object,
      required: true
  },
  route: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Pair = mongoose.model('Pair', PairSchema);

module.exports = Pair;