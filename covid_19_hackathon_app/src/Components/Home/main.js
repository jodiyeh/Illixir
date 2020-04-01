import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './homepage';
import InfoPage from './infopage';
import HospitalPage from './hospitalpage';
import {Layout, Header, Navigation, Drawer,Textfield, Content} from 'react-mdl';
import { Route, Switch } from "react-router-dom";
import Navbar from "../Landing/navbar";
import PrivateRoute from "../PrivateRoute/privateroute";


class Main extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "../login";

  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{height: '100vh', position: 'relative'}}>
        <Layout fixedHeader fixedDrawer>
          <Header className= "header-color" title="Covid-19 App" scroll>
            <Textfield
              value=""
              onChange={() => {}}
              label="Search"
              expandable
              expandableIcon="search"
            />
          </Header>
          <Drawer title="Title">
            <div>
              <b>Hey there,</b> {user.username.split(" ")[0]}
            </div>
            <div>
              <b>{JSON.stringify(user)}</b>
            </div>
            <div>
              <b>{user.streetAddress}</b>
            </div>
            <div>
              <b>{user.city}</b>
            </div>
            <div>
              <b>{user.state}</b>
            </div>
            <div>
              <b>{user.zipcode}</b>
            </div>

            <Navigation>
              <a href="/home">Home</a>
              <a href="/hospitals">Hospitals</a>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>

            </Navigation>

          </Drawer>
          <Content>
          <div />
          <Switch>
            <PrivateRoute path="/home" component ={HomePage} />
            <Route path="/hospitals" render={() => (<HospitalPage city={user.city} state={user.state}/>)}/>
          </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

Main.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Main);
