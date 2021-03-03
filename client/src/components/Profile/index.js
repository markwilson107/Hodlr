import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import { useHoldings } from '../../utils/use-holdings';
import { useAuth } from '../../utils/use-auth';

import { CompactPicker } from 'react-color'

import style from './style';
const useStyles = makeStyles((theme) => (style(theme)));

function Profile({ changeTheme }) {
  const classes = useStyles();
  const {
    isLoggedIn,
    user,
    removeUser,
    jwt,
    login,
    logout,
    updateJwt
  } = useAuth();

  const [pickerVisible, setPickerVisible] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleColorChange = ({ hex }) => {
    changeTheme(hex);
    setPickerVisible(!pickerVisible);
  };

  const onTogglePicker = () => setPickerVisible(!pickerVisible);

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Typography variant="body2" >Profile</Typography>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={4} >
          <Tooltip title="Color Select" aria-label="color">
            <div className={classes.colorSwatch} onClick={() => onTogglePicker()} />
          </Tooltip>
        </Grid>
        <Grid item xs={8} >
          <Typography variant="h6">{user.user}</Typography>
          <Typography variant="caption">{user.email}</Typography>
        </Grid>
      </Grid>
      {pickerVisible ? (
        <div style={{ position: 'absolute' }}>
          <CompactPicker
            color={user.color}
            onChangeComplete={handleColorChange}
          />
        </div>
      ) : ""}
      {
        confirmDelete ? (
          <ListItem style={{ position: "absolute", bottom: 0 }}>
            <ListItemText primary="Are you sure?" />
            <Button onClick={() => { removeUser() }} style={{ textAlign: "right", color: "red" }} >
              Yes
              </Button>
            <Button onClick={() => { setConfirmDelete(false) }} style={{ textAlign: "right" }} >
              No
              </Button>
          </ListItem>
        ) : (
            <ListItem button onClick={() => { setConfirmDelete(true) }} style={{ textAlign: "center", position: "absolute", bottom: 0, color: "red" }}>
              <ListItemText primary="Remove Account" />
            </ListItem>
          )
      }
    </div>
  );
}

export default Profile;