import React, { useState } from 'react';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import style from './style';

const useStyles = makeStyles((theme) => (style(theme)));

function GoBack(props) {
    const classes = useStyles();

    return (
        <div className={classes.back}>
            <IconButton href="/" aria-label="back">
                <KeyboardBackspaceIcon className={classes.arrow} />
            </IconButton>
        </div>
    )

}

export default GoBack;