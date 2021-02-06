import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

const axios = require('axios');

function ExchangeSelect({ exchangeState , setExchangeState}) {

    const classes = useStyles();

    const [exchangesState, setExchangesState] = React.useState({
        exchanges: []
    });

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/exchange/exchanges"
        }).then((res) => {
            setExchangesState({exchanges: res.data});
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleChange = (event) => {
        setExchangeState({ exchange: event.target.value})
    }

    return (
        <div className={classes.root}>
            <Select
                native
                value={exchangeState.exchange}
                onChange={handleChange}
                label="Exchange"
                inputProps={{
                    name: 'exchanges',
                    id: 'exchangeSelect',
                }}
            >
                {
                exchangesState.exchanges.map((row) => (
                  <option value={row}>{row.charAt(0).toUpperCase() + row.slice(1)}</option>  
                ))
                }
            </Select>
        </div>
    );
}

export default ExchangeSelect;