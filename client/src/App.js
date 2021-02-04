import React, { Provider } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Containers
import Landing from "./containers/Landing";
import Dashboard from "./containers/Dashboard";
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
import theme from './theme'
import { ProvideAuth } from "./utils/use-auth";

function MainRoutes() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route>
          <NoResult />
        </Route>
      </Switch>
    </>
  )
}

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={MainRoutes} />
          </Switch>
        </ThemeProvider>
      </Router>
    </ProvideAuth >
  );
}

export default App;


