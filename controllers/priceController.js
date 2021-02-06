const db = require("../models");

module.exports = {
  getPairs: function (req, res) {
    db.Pairs
  }
    // priceByCurrency: function (req, res) {
    //   db.Pairs
    //     .findOne({ userId: req.user.id })
    //     .then(holdings => res.json(holdings.holdings))
    //     .catch(err => res.status(422).json(err));
    // }
  };
  