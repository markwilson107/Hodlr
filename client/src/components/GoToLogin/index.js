import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Button from '@material-ui/core/Button';

import Style from './style';

const useStyles = makeStyles((theme) => (Style(theme)));

function GoToLogin(props) {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <Hidden xsDown>
                <Typography variant="caption" className={classes.text}>Already have an account?</Typography>
            </Hidden>
            <Link className={classes.button}  to={{ pathname: "/login" }}>
                <Button variant="outlined" >
                    Login
                </Button>
            </Link>

        </div>
    )

}

export default GoToLogin;