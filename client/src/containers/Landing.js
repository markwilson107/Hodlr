import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// Components
import LandingBanner from '../components/LandingBanner';

const useStyles = makeStyles((theme) => ({

}));

function Landing({changeTheme}) {
    const classes = useStyles();

    return (
        <div>
            <LandingBanner changeTheme={() => changeTheme}/>
        </div>
    );
}


export default Landing;