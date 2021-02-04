import React, { useState } from 'react';
// Material UI
import { createMuiTheme, responsiveFontSizes, makeStyles} from '@material-ui/core/styles';
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

    },
    rightSide: {

    }
}));

function LandingBanner(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth={false} disableGutters={true}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} className={classes.leftSide}>
                    <Typography variant="h2">
                        I trade crypto currency.<br/>
                        Hodlr gives me an edge over the competition.
                    </Typography>
                    <Button >Join Holdr</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LandingBanner;