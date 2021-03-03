import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';

import { useHoldings } from '../../utils/use-holdings';
import { useAuth } from '../../utils/use-auth';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function History() {
  const classes = useStyles();
  const {
    holdings,
    setHoldings,
    removeHolding,
    addHolding
  } = useHoldings();
  const {
    isLoggedIn,
    jwt
  } = useAuth();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Typography variant="body2" >History</Typography>
      </div>
      <ListItem >
        <ListItemText primary={<strong>Date</strong>} />
      </ListItem>
      {
       holdings.length > 0 ?
          holdings.map((row) => (

            <ListItem button>
              <ListItemText primary={<Moment format="Do MMM YYYY">{row.date}</Moment>} secondary={<Moment format="hh:mm:ss">{row.date}</Moment>} />
              <ListItemText primary={row.base.toUpperCase()} secondary={row.amount} />
              <Button onClick={() => { removeHolding(row.date) }} style={{ textAlign: "right", color: "red" }} >
                Delete
              </Button>
            </ListItem>
            
          )): <div style={{textAlign: "center"}}><Typography variant="body2" >Add a transaction to see history</Typography></div>
      }
    </div>
  );
}

export default History;