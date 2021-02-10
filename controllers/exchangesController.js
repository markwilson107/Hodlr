const exchanges = require("../data/exchanges");
const dontInclude = ["bitmex","796","bitvc","btc-china","cryptsy","deribit","dex-aggregated","kraken-futures","mexbt","mtgox","quadriga","quoine","vault-of-satoshi","wex"]
module.exports = {
  findAll: function (req, res) {
    let result = [];
    exchanges.map(exchange => {
      if (!dontInclude.includes(exchange.exchange))
      result.push(exchange.exchange);
    });
    if (result === [] || result === undefined)
      res.status(422);
    else {
      console.log(result)
      res.json(result.sort((a, b) => a.localeCompare(b)));
    }
  },
  findPairs: function (req, res) {
    let result = exchanges.find(exchange => exchange.exchange === req.params["id"]).data.filter(pair => (pair.active === true && pair.pair.includes("future") === false));
    if (result) {
      res.json(result.sort((a, b) => a.pair.localeCompare(b.pair)));
    }
    else
    res.status(422);
  }

};
