import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideBar from "../Home/SideBar";
import Landing from "../Landing/landing";
import Register from "../Auth/register";
import Login from "../Auth/login";

function Check(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <SideBar />;
  }
  return <div className="App">
    <Route exact path="/" component={Landing} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
  </div>
}

const Greetings = ({ component: Component, auth, ...rest }) => (
  <Check isLoggedIn={auth.isAuthenticated} />
);

Greetings.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Greetings);
