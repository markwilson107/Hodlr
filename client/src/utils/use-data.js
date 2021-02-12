import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { useDidMount } from './useDidMount';

const axios = require('axios');

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  );
}

export function useData() {
  return useContext(dataContext);
}

function useProvideData() {

  const didMount = useDidMount();

  const [currentSelect, setCurrentSelect] = useState({ exchange: "", pair: { pair: "btcusdt", base: "btc", quote: "usdt" } })

  const [exchange, setExchange] = useState({
    current: "binance",
    list: []
  });

  const [pairs, setPairs] = useState({
    current: { pair: "btcusdt", base: "btc", quote: "usdt" },
    list: []
  });

  const [graphData, setGraphData] = useState({
    86400: [[
      1567555200000,
      9727.3,
      9788.9,
      9414.2,
      9690.8,
      888.92215493,
      8601704.133826157
    ],
    [
      1567569600000,
      9692.9,
      9693.4,
      9525,
      9685.1,
      281.73395575,
      2705497.370853147
    ]]
  });

  const [series, setSeries] = useState([{
    name: "Price",
    data: graphData["86400"]
  }])

  const [intervals, setIntervals] = useState({
    current: "86400",
    list: [{ label: "1m", value: "60" }, { label: "3m", value: "180" }, { label: "5m", value: "300" }, { label: "15m", value: "900" }, { label: "30m", value: "1800" }, { label: "1h", value: "3600" }, { label: "2h", value: "7200" }, { label: "4h", value: "14400" }, { label: "6h", value: "21600" }, { label: "12h", value: "43200" }, { label: "1d", value: "86400" }, { label: "3d", value: "259200" }, { label: "1w", value: "604800" }]
  });

  const [pairsOverride, setPairsOverride] = useState({ override: false, state: ""})

  const formatData = (data) => {
    let newData = [];
    data.map((row) => {
      newData.push([row[0] * 1000, row[2]])
    })
    return newData;
  }

  function getExchange() {
    axios({
      method: "get",
      url: "/api/exchange/exchanges"
    }).then((res) => {
      setExchange({ ...exchange, list: res.data });
      console.log("Exchange updated")
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getExchange();
  }, [])

  function getPairs() {
    axios({
      method: "get",
      url: "/api/exchange/exchanges/" + exchange.current
    }).then((res) => {
      if (pairsOverride.override)
      {
      setPairs({ current: pairsOverride.state, list: res.data });
      setPairsOverride ({ override: false, state: ""})
      }
      else
      {
      setPairs({ current: res.data[0], list: res.data });
      }
      console.log("Pairs updated")
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (didMount )
    getPairs();
  }, [exchange])

  // useEffect(() => {
  //   if (didMount)
  //   setCurrentSelect({ exchange: exchange.current, pair: pairs.current})
  // }, [pairs])

  function getGraph() {
    axios({
      method: "get",
      url: `/api/price/${currentSelect.exchange}/${currentSelect.pair.pair}`
    }).then((res) => {
      console.log("Graph updated")
      setGraphData(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (didMount)
    getGraph();
  }, [currentSelect])

  function updateSeries() {
    console.log("Series updated")
    setSeries([{
      name: "Price",
      data: formatData(graphData[intervals.current])
    }])
  }

  useEffect(() => {
    if (didMount)
    updateSeries();
  }, [graphData, intervals])

  return {
    exchange,
    setExchange,
    pairs,
    setPairs,
    graphData,
    setGraphData,
    series,
    intervals,
    setIntervals,
    setPairsOverride,
    setCurrentSelect,
    currentSelect
  }

}