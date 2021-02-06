import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Info(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    );
}

export default Info;