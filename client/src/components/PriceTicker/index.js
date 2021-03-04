import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useData } from '../../utils/use-data';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Ticker(props) {
    const classes = useStyles();
    const {
        exchange,
        setExchange,
        pairs,
        setPairs,
        intervals,
        setIntervals,
        setPairsOverride,
        setCurrentSelect,
        currentSelect,
        graphData
    } = useData();

    let data = graphData["60"];
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Typography style={data ? (data[data.length - 2][2] > data[data.length - 1][2] ? { color: "red" } : { color: "green" }) : { color: "black" }} variant="body2" >{data ? (data[data.length - 1][2]) : "Loading..."}</Typography>
            </Grid>
        </div>
    );
}

export default Ticker;