import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Chart from 'react-apexcharts';

import { useHoldings } from '../../utils/use-holdings'

import style from './style';

const useStyles = makeStyles((theme) => (style(theme)));

function WalletPortfolio() {
    const classes = useStyles();
    const {
        holdings,
        balances,
        pieData
    } = useHoldings();

    const formatCurrency = (data) => {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={`infoDiv ${classes.root}`}>
            <div className={classes.toolbar}>
                <Typography variant="body2" >Portfolio</Typography>
            </div>
            <Grid item xs={12} >
                <Accordion square defaultExpanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Overview</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <Grid container spacing={0}>
                                <Grid item sm={6} md={12} >
                                    <Typography >
                                        <strong>Total: <br />${formatCurrency(balances.total)} USD</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid container spacing={0}>
                {balances.balances.map((row, index) => (
                    <Grid key={`wgrid-${row.currency}-${index}`} item xs={12} sm={6} md={12}>
                        <ListItem key={`wli-${row.currency}-${index}`} button>
                            <ListItemText key={`wlit1-${row.currency}-${index}`} primary={row.base} secondary={row.amount} />
                            <ListItemText key={`wlit2-${row.currency}-${index}`} style={{ textAlign: "right" }} primary={`$${formatCurrency(row.value)} USD`} />
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default WalletPortfolio;