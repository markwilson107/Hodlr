import React, { useState } from 'react';
import { useAuth } from '../../utils/use-auth';
// Material UI
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Hidden from "@material-ui/core/Hidden";

import Style from './style';

const useStyles = makeStyles((theme) => (Style));

function LoginForm(props) {
    const classes = useStyles();

    const {
        isLoggedIn,
        user,
        login
    } = useAuth();

    const [userState, setUserState] = useState(
        {
            email: "",
            password: "",
            errors:
            {
                email: "",
                password2: ""
            }
        }
    );

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
    }

    const submitHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setErrorState(
            {
                code: null,
                message: ""
            }
        );

        let param = new URLSearchParams();
        param.append('email', userState.email);
        param.append('password', userState.password);

        // You must need to validate data but I skipped in here
        login(param, err => {
            if (err === 401) {
                setErrorState({
                    code: err,
                    message: "Username or password is incorrect."
                })
            }
        });
    }


    return (
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
                                <Typography variant="h5" style={{ marginBottom: "5px" }}>Login</Typography>
                                <Typography variant="caption" style={{ color: "grey" }}>Enter your login details below.</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField InputLabelProps={{ required: false }} className={classes.input} id="email" label="Email" type="email" variant="outlined" onChange={onChange} value={userState.email} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField InputLabelProps={{ required: false }} className={classes.input} id="password" label="Password" type="password" variant="outlined" onChange={onChange} value={userState.password} pattern=".{6,20}" required />
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
                                <Button type="submit" variant="contained" color="primary" className={`${classes.button} {classes.root}`}>
                                    Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </form >
                </Container>
            </Grid>
    )

}

export default LoginForm;