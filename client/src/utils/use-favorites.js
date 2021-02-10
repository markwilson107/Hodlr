import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import { useAuth } from './use-auth';
import { useData } from './use-data';

const axios = require('axios');

const favoritesContext = createContext();

export function ProvideFavorites({ children }) {
  const data = useProvideFavorites();
  return (
    <favoritesContext.Provider value={data}>
      {children}
    </favoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(favoritesContext);
}

function useProvideFavorites() {
  const [favorites, setFavorites] = useState([])
  const [currentFavorite, setCurrentFavorite] = useState({ exchange: "", pair: "", interval: "", base: "", quote: ""})
  
  const {
    isLoggedIn,
    user,
    logout,
    updateJwt,
    jwt
  } = useAuth();
  const {
    exchange,
    setExchange,
    pairs,
    setPairs,
    intervals,
    setIntervals
  } = useData();

  useEffect(() => {
    fetch('/api/users/favorites', {
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    }).then(res => {
      return res.json()
    }).then(favs => {
      if (favs !== {})
      {
      setFavorites(favs)
      console.log(favs)
      }
    }).catch(err => {
      setFavorites([]);
      console.log(err);
    })
  }, [user])

  useEffect(() => {
    if (favorites != [])
    favorites.map((row) => {
      if (row.exchange === exchange.current && row.pair === pairs.current.pair) {
        setCurrentFavorite({
          exchange: exchange.current,
          pair: pairs.current.pair,
          base: pairs.current.base,
          quote: pairs.current.quote,
          interval: intervals.current
      });
      }
    })
  }, [exchange, pairs])

  const addFavorite = () => {

    let param = new URLSearchParams();
    param.append('exchange', exchange.current);
    param.append('pair', pairs.current.pair);
    param.append('quote', pairs.current.quote);
    param.append('base', pairs.current.base);
    param.append('interval', intervals.current);

    fetch('/api/users/favorites', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: param
    }).then(res => {
      return res.json()
    }).then(data => {
      setFavorites(data);
      setCurrentFavorite({
        exchange: exchange.current,
        pair: pairs.current.pair,
        base: pairs.current.base,
        quote: pairs.current.quote,
        interval: intervals.current
    });
    }).catch((err) => {
      console.log(err)
    })
  }

  const removeFavorite = () => {
    let param = new URLSearchParams();
    param.append('exchange', exchange.current);
    param.append('pair', pairs.current.pair);
    fetch('/api/users/favorites', {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: param
    }).then(res => {
      return res.json()
    }).then(data => {
      setFavorites(data);
      setCurrentFavorite({
        exchange: "",
        pair: "",
        base: "",
        quote: "",
        interval: ""
    });
    }).catch((err) => {
      console.log(err)
    })
  }

  return {
    favorites,
    currentFavorite,
    addFavorite,
    removeFavorite,
    setCurrentFavorite
  }

}
