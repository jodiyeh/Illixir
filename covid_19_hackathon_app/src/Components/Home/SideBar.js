import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './homepage';
import InfoPage from './infopage';
import SelectPage from './SelectPage';
import UpdateAddress from './UpdateAddress';
import {Layout, Header, Navigation, Drawer,Textfield, Content} from 'react-mdl';
import { Route, Switch } from "react-router-dom";
import Navbar from "../Landing/navbar";
import PrivateRoute from "../PrivateRoute/privateroute";
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      latidude: 100,
      longitude: 100,
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "../login";

  };

  render() {

    const { user } = this.props.auth;
    //Geocode.setApiKey("AIzaSyATfqDvOYhuTkacoeFvXzrvbgGIYw7YwWM");

    //Geocode.setLanguage("en");
    //alert("hi");
    // Get latidude & longitude from address.
    //Geocode.fromAddress("Eiffel Tower").then(
      // response => {
      //   const { lat, lng } = response.results[0].geometry.location;
      //   console.log(lat, lng);
      //   alert(lat, lng);
      //   this.state.latidude = lat;
      //   this.state.longitude = lng;
      // },
      // error => {
      //   alert(error);
      //   console.error(error);
      // }
    //);

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
            <Link to={"/update/" + user.id}>Update Address</Link>
            <Navigation>
              <a href="/home">Home</a>
              <a href="/facilities">Facilities</a>
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
            <PrivateRoute path="/home" component = {HomePage} />
            <Route path="/facilities" render = {() => (<SelectPage latitude={this.state.latitude} longitude={this.state.longitide} city={user.city} state={user.state}/>)}/>
            <Route path="/update/:id" render = {() => (<UpdateAddress id={user.id}/>)}/>
          </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SideBar);
