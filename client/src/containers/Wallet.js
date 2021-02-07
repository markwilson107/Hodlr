import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Utils
import { useAuth } from '../utils/use-auth';

// Components
import Graph from '../components/Graph';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background.dark
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
            <Grid item xs={12} sm={10} md={8} >
              Wallet
            </Grid>
            <Grid item xs={12} sm={2} md={4} >
              Page
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default Wallet;
