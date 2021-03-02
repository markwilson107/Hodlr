import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { useAuth } from './use-auth';
const axios = require('axios');

const holdingsContext = createContext();

export function ProvideHoldings({ children }) {
  const data = useProvideHoldings();
  return (
    <holdingsContext.Provider value={data}>
      {children}
    </holdingsContext.Provider>
  );
}

export function useHoldings() {
  return useContext(holdingsContext);
}

function useProvideHoldings() {

  const [holdings, setHoldings] = useState([]);
  const [balances, setBalances] = useState({ total: 0, balances: [] });
  const [pieData, setPieData] = useState({ series: [], labels: [] });
  const {
    isLoggedIn,
    user,
    logout,
    updateJwt,
    jwt
  } = useAuth();

  useEffect(() => {
    if (isLoggedIn)
      fetch('/api/users/holdings', {
        headers: {
          Authorization: 'Bearer ' + jwt
        }
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(holdings => {
        if (holdings[0].currency) {
          setHoldings(holdings)
          console.log(holdings)
        }
      }).catch(err => {
        setHoldings([]);
        console.log(err);
      })
  }, [user])

  useEffect(() => {
    if (isLoggedIn)
      axios({
        method: "get",
        url: "/api/price/all"
      }).then((res) => {
        calculate(res.data);
      }).catch((err) => {
        console.log(err)
      })

  }, [holdings])

  const calculate = (priceData) => {
    let balances = [];
    let total = 0;
    let series = [];
    let labels = [];
    holdings.map((row) => {
      let index = balances.findIndex(x => x.currency === row.currency);
      if (index === -1) {
        balances.push({ currency: row.currency, base: row.base.toUpperCase(), exchange: row.exchange, amount: 0, value: 0 });
        index = balances.length - 1;
      }
      let tempAmount = parseInt(row.amount)
      balances[index].amount += tempAmount;
    })
    balances.map((row) => {
      let tempTotal = row.amount * priceData[`market:${row.exchange}:${row.currency}`];
      tempTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100
      row.value = tempTotal;
      total += tempTotal;
      labels.push(row.base);
      series.push(row.value);
    })
    setBalances({ balances: balances, total: Math.round((total + Number.EPSILON) * 100) / 100 });
    setPieData({ series: series, labels: labels })
  }

  const addHolding = (exchange, currency, base, amount) => {
    let param = new URLSearchParams();
    param.append('exchange', exchange);
    param.append('currency', currency);
    param.append('base', base);
    param.append('amount', amount);

    if (isLoggedIn)
      fetch('/api/users/holdings', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + jwt
        },
        body: param
      }).then(res => {
        return res.json()
      }).then(data => {
        updateHoldings();
        console.log(data);
      }).catch((err) => {
        console.log(err)
      })
  }

  const removeHolding = (date) => {
    fetch(`/api/users/holdings/${date}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }).then(res => {
      return res.json();
    }).then(holdings => {
      if (holdings[0].date) {
        setHoldings(holdings);
      }
      else {
        setHoldings([]);
      }

      console.log(holdings);
    }).catch((err) => {
      console.log(err);
    })
  }

  const updateHoldings = () => {
    if (isLoggedIn)
      fetch('/api/users/holdings', {
        headers: {
          Authorization: 'Bearer ' + jwt
        }
      }).then(res => {
        return res.json()
      }).then(holdings => {
        setHoldings(holdings)
      }).catch(err => {
        console.log(err);
      })
  }

  return {
    addHolding,
    removeHolding,
    holdings,
    balances,
    pieData
  }

}