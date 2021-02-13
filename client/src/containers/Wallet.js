import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Utils
import { useAuth } from '../utils/use-auth';

// Components
import Balance from '../components/Balance';
import WalletPortfolio from '../components/WalletPortfolio';
import AddHoldings from '../components/AddHoldings';
import History from '../components/History';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background.dark,
    [theme.breakpoints.up('xl')]: {
      padding: "30px 500px 30px 500px"
    },
    [theme.breakpoints.down('xl')]: {
      padding: "30px 400px 30px 400px"
    },
    [theme.breakpoints.down('lg')]: {
      padding: "30px 200px 30px 200px"
    },
    [theme.breakpoints.down('md')]: {
      padding: "30px 60px 30px 60px"
    },
    [theme.breakpoints.down('sm')]: {
      padding: "30px 30px 30px 30px"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "30px 0px 0px 0px"
    }
  },
  paddingTop: {
    paddingTop: "30px"
  }
}));

function Wallet(props) {
  const classes = useStyles();
  const {
    isLoggedIn,
    user,
    updateJwt
  } = useAuth();

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: window.location.pathname }
        }}
      />
    )
  } else {
    return (
      <div className={classes.root}>
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={8} >
              <Balance />
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
              <WalletPortfolio />
            </Grid>
            <Grid item xs={12} className={classes.paddingTop}>
              <AddHoldings />
            </Grid>
            <Grid item xs={12} className={classes.paddingTop}>
              <History />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default Wallet;
