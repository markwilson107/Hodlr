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
    setIntervals,
    setCurrentSelect,
    currentSelect
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
      setFavorites(favs);
      setCurrentSelect({ exchange: favs[0].exchange, pair: { pair: favs[0].pair, base: favs[0].base, quote: favs[0].quote }})
      }
    }).catch(err => {
      setFavorites([]);
      console.log(err);
    })
  }, [user])

  useEffect(() => {
    if (favorites != [])
    favorites.map((row) => {
      if (row.exchange === currentSelect.exchange && row.pair === currentSelect.pair.pair) {
        setCurrentFavorite({
          exchange: currentSelect.exchange,
          pair: currentSelect.pair.pair,
          base: currentSelect.pair.base,
          quote: currentSelect.pair.quote
      });
      }
    })
  }, [currentSelect])


  const addFavorite = () => {

    let param = new URLSearchParams();
    param.append('exchange', currentSelect.exchange);
    param.append('pair', currentSelect.pair.pair);
    param.append('quote', currentSelect.pair.quote);
    param.append('base', currentSelect.pair.base);

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
        exchange: currentSelect.exchange,
        pair: currentSelect.pair.pair,
        base: currentSelect.pair.base,
        quote: currentSelect.pair.quote
    });
    }).catch((err) => {
      console.log(err)
    })
  }

  const removeFavorite = () => {
    let param = new URLSearchParams();
    param.append('exchange', currentSelect.exchange);
    param.append('pair', currentSelect.pair.pair);
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
        quote: ""
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
