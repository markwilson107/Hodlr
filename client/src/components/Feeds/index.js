import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import style from './style';

const useStyles = makeStyles((theme) => (style(theme)));

function Feeds(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )

}

export default Feeds;