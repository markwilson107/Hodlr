import React, { useState } from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CircularProgress from '@material-ui/core/CircularProgress';

import Style from './style';

const useStyles = makeStyles((theme) => (Style(theme)));

function _Button({children, isLoading, type, variant, color }) {
    const classes = useStyles();

    return (
            <Button aria-label="button" type={type} variant={variant} color={color}>
                {children}  {isLoading ? <CircularProgress className={classes.loading} marginLeft={10} size={13} color="black"/> : "" }
            </Button>
    )

}

export default _Button;