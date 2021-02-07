import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Utils
import { useAuth } from '../utils/use-auth';

// Components
import Graph from '../components/Graph';
import Holdings from '../components/Holdings';
import Info from '../components/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background.dark,
    [theme.breakpoints.up('lg')]: {
      padding: "130px 0px 130px 0px"
    },
    [theme.breakpoints.down('lg')]: {
      padding: "0px 150px 0px 150px"
    },
    [theme.breakpoints.down('md')]: {
      padding: "0px 30px 0px 30px"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "0px"
    }
  },
  paddingRight: {
    paddingRight: "35px",
    [theme.breakpoints.up('lg')]: {
      paddingRight: "130px"
    },
    [theme.breakpoints.down('lg')]: {
      paddingRight: "70px"
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: "40px"
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "0px"
    }
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const {
    isLoggedIn,
    user,
    updateJwt
  } = useAuth();

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
    let param = new URLSearchParams();
    param.append('currency', "Link");
    param.append('amount', "2000");

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

  const handleBalance = () => {
    fetch('/api/users/holdings', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    }).then(user => {
      console.log(user);
    }).catch(err => {
      console.log(err);
    })
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
        <Holdings />
        <Container maxWidth={false}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={10} md={8} className={classes.paddingRight} >
              <Graph />
            </Grid>
            <Grid item xs={12} sm={2} md={4} >
              <Info />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default Dashboard;
