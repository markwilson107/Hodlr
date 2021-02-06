import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ExchangeSelect from '../ExchangeSelect';
import PairSelect from '../PairSelect'

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

const axios = require('axios');

function Graph(props) {
    const classes = useStyles();

    const [exchangeState, setExchangeState] = useState({
        exchange: 'binance'
    });

    const [pairState, setPairState] = useState({
        pair: "BTC/USD"
    });

    const [pairs, setPairs] = useState({
        pairs: null
    });

    const [graphData, setGraphData] = useState({
        data: null
    });

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/exchange/exchanges/" + exchangeState.exchange
        }).then((res) => {
            setPairs({ pairs: res.data.data });
        }).catch((err) => {
            console.log(err)
        })
    }, [exchangeState])

    useEffect(() => {
        axios({
            method: "get",
            url: `https://api.cryptowat.ch/markets/${exchangeState.exchange}/${pairState.pair}/ohlc`,
            headers: { 'Access-Control-Request-Origin': 'https://api.cryptowat.ch' }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [pairState])

    return (
        <div className={classes.root}>
            <div style={{ width: "100%" }} >
                <ExchangeSelect exchangeState={exchangeState} setExchangeState={setExchangeState} />
                <PairSelect pairState={pairState} setPairState={setPairState} pairs={pairs.pairs} />
            </div>
        </div>
    );
}

export default Graph;