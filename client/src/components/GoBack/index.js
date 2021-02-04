import React, { useState } from 'react';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Style from './style';

const useStyles = makeStyles((theme) => (Style));

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