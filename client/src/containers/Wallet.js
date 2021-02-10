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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background.dark,

    [theme.breakpoints.down('lg')]: {
      padding: "30px 150px 30px 150px"
    },
    [theme.breakpoints.down('md')]: {
      padding: "30px 30px 30px 30px"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "30px 0px 30px 0px"
    }
  },
  paddingTop: {
    padding: "30px 0px 0px 0px"
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
              <Balance/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} >
             <WalletPortfolio />
            </Grid>
            <Grid item xs={12} className={classes.paddingTop}>
             <AddHoldings />
             </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default Wallet;
