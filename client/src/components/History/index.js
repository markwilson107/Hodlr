import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useHoldings } from '../../utils/use-holdings';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

const columns = [
    { field: 'date', headerName: 'Date', width: 70 },
    { field: 'currency', headerName: 'Currency', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 }
]

function History() {
    const classes = useStyles();
    const {
        holdings,
        addHolding
    } = useHoldings();

    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <Typography variant="body2" >History</Typography>
            </div>
            {holdings ?
            holdings.map((row) => (
                <ListItem button>
                    <ListItemText primary={row.date} />
                    <ListItemText primary={row.exchange} />
                    <ListItemText primary={`${row.amount} ${row.base}`} />
                    <Button style={{ textAlign: "right", color: "red" }} >
                        Delete
                </Button>
                </ListItem>
            )): "Add a transaction above"
            }
        </div>
    );
}

export default History;