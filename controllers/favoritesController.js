const db = require("../models");

module.exports = {
  findByUserID: function (req, res) {
    db.Favorites
      .findOne({ userId: req.user.id })
      .then(favs => res.json(favs.favorites))
      .catch(err => res.status(422).json(err));
  },
  updateOrCreate: function(req, res) {
    let newFav = req.body;
    db.Favorites
      .findOneAndUpdate({ userId: req.user.id }, {"$push": {"favorites": { "exchange": newFav.exchange, "pair": newFav.pair, "quote": newFav.quote, "base": newFav.base, "date": Date.now}}}, {upsert: true, new: true,})
      .then(favs => res.json(favs.favorites))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    let deleteFav = req.body;
    db.Favorites.findOneAndUpdate( { userId: req.user.id }, { "$pull": {"favorites": { "exchange": deleteFav.exchange, "pair": deleteFav.pair } } }, {upsert: true, new: true,})
      .then(favs => res.json(favs.favorites))
      .catch(err => res.status(422).json(err));
  }
};
