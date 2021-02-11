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

function Portfolio() {
    const classes = useStyles();
    const {
        holdings,
        balances,
        pieData
    } = useHoldings();

    const [chartOptions, setChartOptions] = useState({
        series: pieData.series,
        options: {
            chart: {
                width: '100%',
                type: 'pie',
            },
            labels: pieData.labels,
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#ffce49',
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },
            tooltip: {
                y: {
                    formatter: function(value) {
                      return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD`
                    }
                  }
            },
            dataLabels: {
                show: false,
                formatter: function (val, opts) {
                    return opts.w.config.labels[opts.seriesIndex]
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    }

                }
            },
            legend: {
                show: false
            }
        }

    });

    useEffect(() => {
        setChartOptions({ ...chartOptions, series: pieData.series, options: { labels: pieData.labels} })
    }, [pieData])

    const formatCurrency = (data) => {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={`infoDiv ${classes.root}`}>
            <div className={classes.add}>
                <Link to={{ pathname: "/wallet" }}>
                    <IconButton aria-label="add">
                        <AddCircleIcon />
                    </IconButton>
                </Link>
            </div>
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
                                <Grid item sm={6} md={12}  >
                                    <div className="donut">
                                        <Chart options={chartOptions.options} series={chartOptions.series} type="pie" width="100%" />
                                    </div>
                                </Grid>
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
                    <Grid key={`grid-${row.currency}-${index}`} item xs={12} sm={6} md={12}>
                        <ListItem key={`li-${row.currency}-${index}`} button>
                            <ListItemText key={`lit1-${row.currency}-${index}`} primary={row.currency} secondary={row.amount} />
                            <ListItemText key={`lit2-${row.currency}-${index}`} style={{ textAlign: "right" }} primary={`$${formatCurrency(row.value)} USD`} />
                        </ListItem>
                        <Divider />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Portfolio;