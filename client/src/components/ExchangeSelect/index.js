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

function ExchangeSelect({ exchange, setExchange }) {

    const classes = useStyles();

    const handleChange = (event) => {
        setExchange({ ...exchange, current: event.target.value })
    }

    return (
        <div className={classes.root}>
            <Select
                disableUnderline
                native
                value={exchange.current}
                onChange={handleChange}
                label="Exchange"
                inputProps={{
                    name: 'exchanges',
                    id: 'exchangeSelect',
                    style: { paddingLeft: "10px" }
                }}
            >
                {
                    exchange.list ?
                        exchange.list.map((row, index) => (
                            <option key={`${row}`} value={row}>{row.charAt(0).toUpperCase() + row.slice(1)}</option>
                        )) : ""
                }
            </Select>
        </div>
    );
}

export default ExchangeSelect;