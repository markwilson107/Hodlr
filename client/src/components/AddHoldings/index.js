import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import ChartJS from "../ChartJS";
import ApexCharts from 'apexcharts';
import PriceChart from "react-apexcharts";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { useData } from '../../utils/use-data';
import { useHoldings } from '../../utils/use-holdings';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

const axios = require('axios');

function getSteps() {
    return ['Choose Exchange', 'Select Currency', 'Enter Amount'];
}

function AddHoldings() {
    const classes = useStyles();
    const {
        holdings,
        addHolding
    } = useHoldings();
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

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const [pairsAvailable, setPairsAvailable] = useState([]);

    const [transaction, setTransaction] = useState({
        exchange: "binance",
        currency: "btcusdt",
        base: "btc",
        amount: ""
    })

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/exchange/exchanges/" + transaction.exchange
        }).then((res) => {
            setPairsAvailable(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleExchange = (event) => {
        setTransaction({ ...transaction, exchange: event.target.value })
        axios({
            method: "get",
            url: "/api/exchange/exchanges/" + event.target.value
        }).then((res) => {
            setPairsAvailable(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleCurrency = (event) => {
        setTransaction({ ...transaction, currency: event.target.value, base: event.target[event.target.selectedIndex].getAttribute('data-base') })
    }

    const onAmountChange = (event) => {
        setTransaction({ ...transaction, amount: event.target.value })
    }

    const handleNext = () => {
        if (activeStep === 2 && transaction.amount > 0) {
            addHolding(transaction.exchange, transaction.currency, transaction.base, transaction.amount);
            setTransaction({ ...transaction, amount: 0 })
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <Typography variant="body2" >Add Transaction</Typography>
            </div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    return (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div className={classes.addTransaction}>
                {activeStep === 0 ? (
                    <div>
                        <FormControl variant="outlined" style={{ width: "100%", maxWidth: "400px" }}>
                            <InputLabel id="select-exchange-trans">Exchange</InputLabel>
                            <Select
                                native
                                id="select-exchange-trans"
                                value={transaction.exchange}
                                onChange={handleExchange}
                                label="Exchange"

                                inputProps={{
                                    name: 'exchanges',
                                    id: 'exchangeSelect'
                                }}
                            >
                                {
                                    exchange.list ?
                                        exchange.list.map((row, index) => (
                                            <option key={`${row}`} value={row}>{row.charAt(0).toUpperCase() + row.slice(1)}</option>
                                        )) : ""
                                }
                            </Select>
                        </FormControl>
                    </div>
                ) : activeStep === 1 ? (
                    <div>
                        <FormControl variant="outlined" style={{ width: "100%", maxWidth: "400px" }}>
                            <InputLabel id="select-pair-trans">Currency</InputLabel>
                            <Select
                                native
                                id="select-pair-trans"
                                variant="outlined"
                                value={transaction.currency}
                                onChange={handleCurrency}
                                label="Currency"
                                style={{ width: "100%", maxWidth: "400px" }}
                                inputProps={{
                                    name: 'pairs',
                                    id: 'pairSelect'
                                }}
                            >
                                {
                                    pairsAvailable ?
                                        pairsAvailable.map((row) => (
                                            <option key={row.pair} value={row.pair} data-base={row.base} data-quote={row.quote}>{row.base.toUpperCase()}{"/"}{row.quote.toUpperCase()}</option>
                                        )) : ""
                                }
                            </Select>
                        </FormControl>
                    </div>
                ) : activeStep === 2 ? (
                    <div>
                        <TextField InputLabelProps={{ required: false }} className={classes.input} id="amount" label="Amount" type="number" variant="outlined" onChange={onAmountChange} value={transaction.amount} />
                    </div>
                ) : ""
                }
            </div>
            <div className={classes.transactionMenu}>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Transaction has been added!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleReset}
                            className={classes.button}
                        >
                            Add another
                        </Button>
                    </div>
                ) : (
                        <div>

                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default AddHoldings;