import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import {useAuth} from '../utils/use-auth';

function Dashboard(props) {
  const {
    isLoggedIn,
    user,
    updateJwt
  } = useAuth();

  const handleAddLink = () => {
    let param = new URLSearchParams();
    param.append('currency', "Link");
    param.append('amount', "5000");

    fetch('/api/users/holdings', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: param
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleAddMoreLink = () => {
    let param = new URLSearchParams();
    param.append('currency', "Link");
    param.append('amount', "2000");

    fetch('/api/users/holdings', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: param
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleBalance = () => {
    fetch('/api/users/holdings', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    }).then(user => {
      console.log(user);
    }).catch(err => {
      console.log(err);
    })
  }
  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    )
  } else {
    return (
      <div>
        Success this is your dashboard!
        <button onClick={handleAddLink}>Add Link</button>
        <button onClick={handleAddMoreLink}>Add More Link</button>
        <button onClick={handleBalance}>Balance</button>
      </div>
    );
  }
}


export default Dashboard;
