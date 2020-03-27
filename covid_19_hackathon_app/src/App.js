
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./Components/PrivateRoute/privateroute";
import Main from "./Components/Home/main";
import Home from "./Components/Home/homepage";
import InfoPage from "./Components/Home/infopage";
import Greetings from "./Components/PrivateRoute/greeting";


import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

render() {
  return (
    <Provider store={store}>
      <Router>
        <Greetings />
      </Router>
    </Provider>
  );
}
}
export default App;
