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

function IntervalSelect({ intervals , setIntervals }) {

    const classes = useStyles();

    const handleChange = (event) => {
        setIntervals({ ...intervals, current: event.target.value})
    }

    return (
        <div className={classes.root}>
            <Select
            disableUnderline
                native
                value={intervals.current}
                onChange={handleChange}
                label="Intervals"
                inputProps={{
                    name: 'intervals',
                    id: 'intervalsSelect',
                    style: {paddingLeft: "10px"}
                }}
            >
                {
                intervals.list.map((row, index) => (
                  <option key={`${row.value}`} value={`${row.value}`}>{row.label}</option>  
                ))
                }
            </Select>
        </div>
    );
}

export default IntervalSelect;