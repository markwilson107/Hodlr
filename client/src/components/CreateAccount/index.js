import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Button from '@material-ui/core/Button';

import Style from './style';

const useStyles = makeStyles((theme) => (Style(theme)));

function CreateAccount(props) {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <Hidden xsDown>
                <Typography variant="caption" className={classes.text}>Don't have an account?</Typography>
            </Hidden>
            <Link className={classes.button} to={{ pathname: "/register" }}>
                <Button href="" variant="outlined" >
                    Create Account
                </Button>
            </Link>

        </div>
    )

}

export default CreateAccount;