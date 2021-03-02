import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../utils/use-auth';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from "@material-ui/core/Hidden";
import TextField from '@material-ui/core/TextField';
import Button from "../Button/index.js";
//Components
import GoBack from "../GoBack";
import LoginColumn from '../LoginColumn';
import GoToLogin from "../GoToLogin";

import Style from './style';

const useStyles = makeStyles((theme) => (Style(theme)));

function Register(props) {
    const classes = useStyles();

    const {
        isLoggedIn,
        user,
        login,
        updateJwt
    } = useAuth();


    const [userState, setUserState] = useState(
        {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors:
            {
                name: "",
                email: "",
                password: "",
                password2: ""
            }
        }
    )

    const [isLoading, setIsLoading] = useState(false);

    const [errorState, setErrorState] = useState(
        {
            code: null,
            message: ""
        }
    )

    const onChange = (e) => {
        const newState = {
            ...userState,
            [e.target.id]: e.target.value
        }
        setUserState(newState);
    };

    const submitHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrorState(
            {
                code: null,
                message: ""
            });
        setIsLoading(true);

        let param = new URLSearchParams();
        param.append('name', userState.name);
        param.append('email', userState.email);
        param.append('password', userState.password);
        param.append('password2', userState.password2);

        // Need to validate data 

        // Send request to the server
        fetch('/api/users/register', {
            method: 'POST',
            body: param
        }).then((res) => {
            return res.json()
        }).then(data => {
            setIsLoading(false);
            updateJwt(data.token);
        }).catch((err) => {
            setErrorState(
                {
                    code: null,
                    message: ""
                }
            );
            console.error(err);
        })
    }

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
                <GoToLogin />
                <Container maxWidth={false} disableGutters={true}>
                    <Grid container spacing={0}>
                        <Hidden smDown>
                            <Grid item md={5} lg={4} className={classes.leftSide}>
                                <LoginColumn />
                            </Grid>
                        </Hidden>
                        <Grid item sm={12} md={7} lg={8} className={classes.rightSide}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                style={{ minHeight: '100%' }}
                                spacing={0}
                            >
                                <Container>
                                    <Hidden mdUp>
                                        <img className={classes.logo} src="./hodlr-logo-300.png" />
                                    </Hidden>
                                    <form onSubmit={submitHandle}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={3}

                                        >
                                            <Grid item xs={12}>
                                                <Typography variant="h5" style={{ marginBottom: "5px" }}>Register</Typography>
                                                <Typography variant="caption" style={{ color: "grey" }}>Enter your details below.</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{ required: false }}
                                                    className={classes.input}
                                                    id="name"
                                                    label="Name"
                                                    type="text"
                                                    variant="outlined"
                                                    onChange={onChange}
                                                    value={userState.name}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{ required: false }}
                                                    className={classes.input}
                                                    id="email"
                                                    label="Email"
                                                    type="email"
                                                    variant="outlined"
                                                    onChange={onChange}
                                                    value={userState.email}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{ required: false }}
                                                    className={classes.input}
                                                    id="password"
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    onChange={onChange}
                                                    value={userState.password}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    InputLabelProps={{ required: false }}
                                                    className={classes.input}
                                                    id="password2"
                                                    label="Repeat Password"
                                                    type="password"
                                                    variant="outlined"
                                                    onChange={onChange}
                                                    value={userState.password2}
                                                    required
                                                />
                                            </Grid>
                                            {errorState.code ?
                                                (
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" style={{ color: "red" }}>
                                                            {errorState.message}
                                                        </Typography>
                                                    </Grid>
                                                ) : ""}
                                            <Grid item xs={12}>
                                                <Button type="submit" isLoading={isLoading} variant="contained" color="primary" >
                                                    Sign ip
                                                 </Button>
                                            </Grid>
                                        </Grid>
                                    </form >
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default Register;

