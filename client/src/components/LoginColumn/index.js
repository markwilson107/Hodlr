import React, { useState } from 'react';
// Material UI
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Style from './style';

const useStyles = makeStyles((theme) => (Style));

function LoginColumn(props) {
    const classes = useStyles();

    return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100%' }}
            >

                <div>
                    <img className={classes.logo} src="./hodlr-logo-300.png" />
                </div>
                <div className={classes.description}>
                    <Typography variant="body1">A Powerful yet easy-to-use application for tracking and keeping up-to-date with all your cryptocurrency assets.</Typography>
                </div>
            </Grid>
    )

}

export default LoginColumn;