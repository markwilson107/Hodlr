import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Chart from 'react-apexcharts';

import { useHoldings } from '../../utils/use-holdings'

import style from './style';

const useStyles = makeStyles((theme) => (style(theme)));

function Balance() {
    const classes = useStyles();
    const theme = useTheme();
    const {
        holdings,
        balances,
        pieData
    } = useHoldings();

    const [chartOptions, setChartOptions] = useState({
        series: pieData.series,
        options: {
            chart: {
                height: '100%',
                type: 'pie',
            },
            labels: pieData.labels,
            theme: {
                monochrome: {
                    enabled: true,
                    color: theme.palette.primary.yellow,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                width: 1,
                dashArray: 0,
            },
            noData: {
                text: "Add a transaction below",
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: undefined,
                  fontSize: '14px',
                  fontFamily: undefined
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
                show: true,
                formatter: function (val, opts) {
                    return `$${opts.w.config.series[opts.seriesIndex].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD \n${opts.w.config.labels[opts.seriesIndex]}`
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

    return (
        <div id="balanceDiv" className={`${classes.root}`} >
            <div className="donut">
                <Chart options={chartOptions.options} series={chartOptions.series} type="pie" height="400" width="100%" />
            </div>

        </div>
    );
}

export default Balance;