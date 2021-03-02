import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    leftSide: {
        backgroundColor: "#efefef",
        height: "700px",
        padding: "80px",
        zIndex: 1
    },
    logo: {
        position: "absolute",
        right: 0,
        height: "100vh"
    },
    button: {
        textDecoration: "none",
        position: "relative",
        top: 40,

    }
}));

function LandingBanner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth={false} disableGutters={true}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} className={classes.leftSide}>
                        <Typography variant="h2">
                            I trade crypto currency.
                    </Typography>
                        <Typography variant="h2">
                            Hodlr gives me an edge.
                    </Typography>
                        <Link className={classes.button} to={{ pathname: "/register" }}>
                            <Button className={classes.button} variant="contained" color="primary" >Join Holdr</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <img className={classes.logo} src="./landing-art.png" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LandingBanner;