const db = require("../models");

module.exports = {
  findByUserID: function (req, res) {
    db.Holdings
      .findOne({ userId: req.user.id })
      .then(holdings => res.json(holdings.holdings))
      .catch(err => res.json(err));
  },
  updateOrCreate: function(req, res) {
    let newHoldings = req.body;
    db.Holdings
      .findOneAndUpdate({ userId: req.user.id }, {"$push": {"holdings": { "currency": newHoldings.currency, "base": newHoldings.base, "exchange": newHoldings.exchange, "amount": newHoldings.amount, "date": Date.now}}}, {upsert: true, new: true,})
      .then(holdings => res.json(holdings.holdings))
      .catch(err => res.status(422).json(err));
  },
  // remove: function(req, res) {
  //   db.Holdings
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
