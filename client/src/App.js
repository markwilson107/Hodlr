import React, { Provider, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Containers
import Landing from "./containers/Landing";
import Dashboard from "./containers/Dashboard";
import Wallet from "./containers/Wallet";
import NoResult from "./containers/NoResult";
// Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
// Utils
import PrivateRoute from './utils/PrivateRoute'
// Material UI
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'

import { ProvideAuth } from "./utils/use-auth";
import { ProvideData } from "./utils/use-data";
import { ProvideHoldings } from "./utils/use-holdings";
import { ProvideFavorites } from "./utils/use-favorites";

//import coreTheme from './theme'

function App() {

  function shadeColor(color, percent) {

    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    let RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    let GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    let BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
  }

  const [theme, setTheme] = useState({
    theme1: {
      palette: {
        primary: { 500: '#ffce49', yellow: '#ffce49', dark: shadeColor('#ffce49', -10) }
      },
      background: {
        main: '#f9f9f9',
        dark: '#efefef'
      },
      text: {
        primary: { 500: '00000' }
      }
    }
  });

  const changeTheme = (color) => {
    setTheme({
      theme1: {
        ...theme.theme1,
        palette: {
          primary: { 500: color, yellow: color, dark: shadeColor(color, -10) }
        }
      }
    });
  }

  const MUITheme = createMuiTheme(theme.theme1);
  MUITheme.shadows = [];

  function MainRoutes() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/wallet" comp={Wallet} changeTheme={changeTheme} />
          <PrivateRoute exact path="/dashboard" comp={Dashboard} />
          <Route>
            <NoResult />
          </Route>
        </Switch>
      </>
    )
  }

  return (
    <ProvideAuth>
      <ProvideData>
        <ProvideHoldings>
          <ProvideFavorites>
            <Router>
              <ThemeProvider theme={MUITheme}>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route component={MainRoutes} />
                </Switch>
              </ThemeProvider>
            </Router>
          </ProvideFavorites>
        </ProvideHoldings>
      </ProvideData>
    </ProvideAuth >
  );
}

export default App;


