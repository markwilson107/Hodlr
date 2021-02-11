import React, { useRef, useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Utils
import { useAuth } from '../utils/use-auth';

// Components
import Graph from '../components/Graph';
import Favorites from '../components/Favorites';
import Portfolio from '../components/Portfolio';
import Feeds from '../components/Feeds';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
    backgroundColor: theme.background.dark,
    [theme.breakpoints.up('xl')]: {
      padding: "0px 500px 0px 500px"
    },
    [theme.breakpoints.down('xl')]: {
      padding: "0px 400px 0px 400px"
    },
    [theme.breakpoints.down('lg')]: {
      padding: "0px 200px 0px 200px"
    },
    [theme.breakpoints.down('md')]: {
      padding: "0px 60px 0px 60px"
    },
    [theme.breakpoints.down('sm')]: {
      padding: "0px 30px 0px 30px"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "0px"
    }
  },
  paddingRight: {
    paddingRight: "35px",
    [theme.breakpoints.up('lg')]: {
      paddingRight: "70px"
    },
    [theme.breakpoints.down('lg')]: {
      paddingRight: "70px"
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: "0px"
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "0px"
    }
  },
  aside: {
    paddingTop: "0px",
    minHeight: "200px",
    [theme.breakpoints.down('sm')]: {
      paddingTop: "35px"
    }
  },
  paddingTop: {
    paddingTop: "35px"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const {
    isLoggedIn,
    user,
    updateJwt
  } = useAuth();

  const graphRef = useRef();

  const handleAddLink = () => {
    let param = new URLSearchParams();
    param.append('currency', "Link");
    param.append('amount', "5000");

    fetch('/api/users/holdings', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: param
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleAddMoreLink = () => {

  }

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
        <Favorites />
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={8} className={classes.paddingRight} >
              <Graph />
            </Grid>
            <Grid item xs={12} sm={12} md={4} className={classes.aside} >
              <Portfolio />
            </Grid>
            <Grid item xs={12} className={classes.paddingTop} >
              <Feeds />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default Dashboard;
