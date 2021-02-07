// use `$ node generateExchangeData.js`
// generates 2 files
// - exchanges.json
// - pairs.json
// import with MongoDB Compass

const fetch = require("node-fetch");
var fs = require('fs');
const pairs = require("./pairs");

fetch('https://api.cryptowat.ch/markets')
    .then(response => response.json())
    .then(res => {
        console.log(res.result[0]);
        let exchanges = [];
        res.result.map((row) => {
            let index = exchanges.findIndex(x => x.exchange === row.exchange);
            if (index === -1) {
                exchanges.push({ exchange: row.exchange, data: [] })
                index = exchanges.length - 1;
            }
            console.log(index)

            let pairIndex = pairs.findIndex(x => x.symbol === row.pair);

            exchanges[index].data.push(
                {
                    id: row.id,
                    exchange: row.exchange,
                    pair: row.pair,
                    base: pairs[pairIndex].base.symbol,
                    quote: pairs[pairIndex].quote.symbol,
                    pairRoute: pairs[pairIndex].route,
                    active: row.active,
                    route: row.route
                }
            )
        });

        fs.writeFile("exchanges.json", JSON.stringify(exchanges), function (err) {
            if (err) {
                console.log(err);
            }
        });


    });

fetch('https://api.cryptowat.ch/pairs')
    .then(response => response.json())
    .then(res => {
        fs.writeFile("pairs.json", JSON.stringify(res.result), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

fetch('https://api.cryptowat.ch/assets')
    .then(response => response.json())
    .then(res => {
        fs.writeFile("assets.json", JSON.stringify(res.result), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

