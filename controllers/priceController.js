const db = require("../models");
const axios = require('axios');
const keys = require("../config/keys");

const development = false;
dummyPrice = require('../data/dummyPrice');

module.exports = {
  getPrice: function (req, res) {
    if (development) {
      res.json(dummyPrice.result)
    } else {
      axios({
        method: "get",
        url: `https://api.cryptowat.ch/markets/${req.params["exchange"]}/${req.params["pair"]}/ohlc`+`?apikey=`+keys.cryptowatchAPI,
        headers: { 'Access-Control-Request-Origin': 'https://api.cryptowat.ch' }
      }).then((price) => {
        res.json(price.data.result);
      }).catch((err) => {
        res.status(422).json(err);
        console.log(err);
      })
    }
  },
  getAll: function (req,res) {
    axios({
      method: "get",
      url: `https://api.cryptowat.ch/markets/prices`+`?apikey=`+keys.cryptowatchAPI,
      headers: { 'Access-Control-Request-Origin': 'https://api.cryptowat.ch' }
    }).then((price) => {
      res.json(price.data.result);
    }).catch((err) => {
      res.status(422).json(err);
      console.log(err);
    })
  }
  // priceByCurrency: function (req, res) {
  //   db.Pairs
  //     .findOne({ userId: req.user.id })
  //     .then(holdings => res.json(holdings.holdings))
  //     .catch(err => res.status(422).json(err));
  // }
};
