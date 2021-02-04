import React, { useState } from 'react';
// Material UI
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Button from '@material-ui/core/Button';

import Style from './style';

const useStyles = makeStyles((theme) => (Style));

function CreateAccount(props) {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <Hidden xsDown>
                <Typography variant="caption" className={classes.text}>Don't have an account?</Typography>
            </Hidden>
            <Button href="/register" variant="outlined" >
                Create Account
            </Button>

        </div>
    )

}

export default CreateAccount;