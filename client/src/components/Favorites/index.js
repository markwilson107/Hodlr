import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useFavorites } from '../../utils/use-favorites';
import { useData } from '../../utils/use-data';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Holdings(props) {
    const classes = useStyles();
    const {
        favorites,
        addFavorite,
        setCurrentFavorite
    } = useFavorites();
    const {
        exchange,
        setExchange,
        pairs,
        setPairs,
        intervals,
        setIntervals
    } = useData();


    const handleClick = (ex, p, b, q, i) => {
        setCurrentFavorite({
            exchange: ex,
            pair: p,
            base: b,
            quote: q,
            interval: i
        });
        setExchange({ ...exchange, current: ex });
        setPairs({ ...pairs, current: { pair: p, base: b, quote: q } });
        setIntervals({ ...intervals, current: i });
    }

    return (
        <div className={classes.root}>
            <Container maxWidth={false} >
                <Grid container spacing={0}>
                    <Grid item >
                        {favorites.map((row) =>
                            <Button onClick={() => { handleClick(row.exchange, row.pair, row.base, row.quote, row.interval) }} >{row.base}<Typography className={classes.quote} variant="caption">/{row.quote}</Typography></Button>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Holdings;