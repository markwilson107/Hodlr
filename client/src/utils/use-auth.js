import React, { useContext, createContext, useState, useEffect } from "react";
const axios = require('axios');

// Client > username, password
// Server > username, password (hashed)

// Client logs in > sends username, password
// Server > signs a jwt token and sends it back

// 1. Easy to transport
// 2. Its not username and password (safe to store in localStorage)
// 3. It expires after a set time (client keeps refreshing)

// Client receives token and stores it
// Session storage lasts until the browser is closed.
// Local storage lasts until indefinitely.
// When you log out, you remove the token.

// Client now sends the token with any request for authenticated information.
// From the token, the server can decrypt it to find user information...

// When the user comes back to the website after a while...
// Send the token to the server, asking (is this still valid?)
// NO.

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
  const [jwt, setJwt] = useState(localStorage.getItem('token'))

  const isLoggedIn = user !== null;

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/users/user",
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }).then((res) => {
      setUser(res.data)
    }).catch((err) => {
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
    })
  }

  function logout() {
    localStorage.removeItem('token');
    setJwt(undefined);
  }

  return {
    isLoggedIn,
    user,
    login,
    logout,
    updateJwt
  };
}