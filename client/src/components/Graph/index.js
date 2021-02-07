import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ExchangeSelect from '../ExchangeSelect';
import PairSelect from '../PairSelect';
import IntervalSelect from '../IntervalSelect';
import ChartJS from "../ChartJS";
import ApexCharts from 'apexcharts';
import PriceChart from "react-apexcharts";

import { useData } from '../../utils/use-data';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Graph(props) {
    const classes = useStyles();
    const {
        exchange,
        setExchange,
        pairs,
        setPairs,
        graphData,
        setGraphData,
        series,
        intervals,
        setIntervals
    } = useData();

    const [chartOptionsState, setChartOptionsState] = useState(
        {
            options: {
                chart: {
                    id: "basic-bar",
                    offsetX: 0,
                    zoom: {
                        enabled: true
                    },
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true
                        }
                    }
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 2,
                    dashArray: 0,
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    followCursor: true,
                    x: {
                        format: "dd MMM hh:mm:ss",
                        show: false
                    }
                }
                ,
                fill: {
                    opacity: 1,
                    type: 'gradient'
                },
                colors: ['#ffce49'],
                xaxis: {
                    show: true,
                    type: 'datetime',

                    labels: {
                        show: true,
                        align: 'left',
                        minWidth: 100,
                        offsetX: 0,
                        offsetY: 0,
                        rotate: 0
                    },
                },
                yaxis: {
                    show: true,
                    floating: true,
                    labels: {
                        show: true,
                        align: 'left',
                        offsetX: 70,
                        offsetY: -4,
                        rotate: 0,
                        style: {
                            colors: "grey"
                        }
                    },
                }
            }
        });

    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <ExchangeSelect exchange={exchange} setExchange={setExchange} />
                <PairSelect pairs={pairs} setPairs={setPairs} />
                <IntervalSelect intervals={intervals} setIntervals={setIntervals} />
            </div>
            <PriceChart
                options={chartOptionsState.options}
                series={series}
                type="area"
            />
        </div>
    );
}

export default Graph;