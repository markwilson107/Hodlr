import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../utils/use-auth';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from "@material-ui/core/Hidden";
//Components
import GoBack from "../GoBack";
import CreateAccount from "../CreateAccount";
import LoginColumn from '../LoginColumn';
import LoginForm from '../LoginForm';

import Style from './style';

const useStyles = makeStyles((theme) => (Style(theme)));

function Login(props) {
    const classes = useStyles();

    const {
        isLoggedIn,
        user,
        login
    } = useAuth();


    if (isLoggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/dashboard',
                    state: { from: props.location }
                }}
            />
        )
    } else {
        return (
            <div className={classes.root}>
                <GoBack />
                <CreateAccount />
                <Container maxWidth={false} disableGutters={true}>
                    <Grid container spacing={0}>
                        <Hidden smDown>
                            <Grid item md={5} lg={4} className={classes.leftSide}>
                                <LoginColumn />
                            </Grid>
                        </Hidden>
                        <Grid item sm={12} md={7} lg={8} className={classes.rightSide}>
                            <LoginForm />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        )
    }
}

export default Login;