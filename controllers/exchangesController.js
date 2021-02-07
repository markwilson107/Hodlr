const exchanges = require("../data/exchanges");

module.exports = {
  findAll: function (req, res) {
    let result = [];
    exchanges.map(exchange => {
      result.push(exchange.exchange);
    });
    if (result === [])
      res.status(422);
    else {
      console.log(result)
      res.json(result);
    }
  },
  findPairs: function (req, res) {
    let result = exchanges.find(exchange => exchange.exchange === req.params["id"]);
    if (result) {
      res.json(result.data);
    }
    else
    res.status(422);
  }

};
