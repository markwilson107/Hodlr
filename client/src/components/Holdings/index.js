import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Holdings(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth={false} >
                <Grid container spacing={0}>
                    <Grid item >
                        <Button >Link</Button>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Holdings;