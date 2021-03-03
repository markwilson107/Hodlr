import React, { useContext, createContext, useState, useEffect } from "react";
const axios = require('axios');

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(localStorage.getItem('token'));
  const isLoggedIn = user !== null;

  useEffect(() => {
    
    if (jwt)
    axios({
      method: "get",
      url: "/api/users/user",
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }).then((res) => {
      setUser(res.data)
      console.log(res.data);
    }).catch((err) => {
      setUser(null)
      console.log(err)
    })
  }, [jwt])

  function updateJwt(token) {
    localStorage.setItem('token', token);
    setJwt(token);
  }

  function login(body, cb) {
    // Send request to the server
    axios({
      method: 'post',
      url: '/api/users/login',
      data: body
    }).then((res) => {
      updateJwt(res.data.token);
    }).catch((err) => {
      if (err.response) {
        cb(err.response.status);
      }
    });
  }

  function logout() {
    localStorage.removeItem('token');
    setJwt(undefined);
    setUser(null);
  };

  function removeUser() {
    axios({
      method: "delete",
      url: "/api/users/user",
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }).then((res) => {
      logout();
    }).catch((err) => {
      console.log(err);
    })
  }

  return {
    isLoggedIn,
    user,
    removeUser,
    jwt,
    login,
    logout,
    updateJwt
  };
}