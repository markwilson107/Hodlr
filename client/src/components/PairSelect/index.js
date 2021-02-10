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

function PairSelect({ pairs, setPairs }) {

    const classes = useStyles();

    const handleChange = (event) => {
        setPairs({ ...pairs, current: { pair: event.target.value, base: event.target[event.target.selectedIndex].getAttribute('data-base'), quote: event.target[event.target.selectedIndex].getAttribute('data-quote') } })
    }

    return (
        <div className={classes.root}>
            <Select
                native
                disableUnderline
                value={pairs.current.pair}
                onChange={handleChange}
                label="Pair"
                inputProps={{
                    name: 'pairs',
                    id: 'pairSelect',
                    style: { paddingLeft: "10px" }
                }}
            >
                {
                    pairs.list ?
                        pairs.list.map((row) => (
                            <option key={row.pair} value={row.pair} data-base={row.base} data-quote={row.quote}>{row.base.toUpperCase()}{"/"}{row.quote.toUpperCase()}</option>
                        )) : ""
                }
            </Select>
        </div>
    );
}

export default PairSelect;