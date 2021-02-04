import React, { useState } from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import Style from './style';

const useStyles = makeStyles((theme) => (Style));

function GoBack(props) {
    const classes = useStyles();

    return (
            <Button href="/" aria-label="back">
                <KeyboardBackspaceIcon className={classes.arrow} />
            </Button>
    )

}

export default GoBack;