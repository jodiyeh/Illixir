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
import axios from 'axios';

class SideBar extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      latidude: 0,
      longitude: 0,
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "../login";

  };

  componentDidMount () {
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
    axios.get('http://localhost:5000/api/users/'+this.props.auth.user.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          state: response.data.state,
          city: response.data.city,
          streetAddress: response.data.streetAddress,
          zipcode: response.data.zipcode
        })
      })
      .catch( function (error) {
        console.log(error);
      })
  }


  render() {
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
              <b>Hey there,</b> {this.state.username.split(" ")[0]}
            </div>
            <div>
              <b>{this.state.streetAddress}</b>
            </div>
            <div>
              <b>{this.state.city}</b>
            </div>
            <div>
              <b>{this.state.state}</b>
            </div>
            <div>
              <b>{this.state.zipcode}</b>
            </div>
            <Navigation>
              <a href="/home">Home</a>
              <a href={"/update/" + this.props.auth.user.id}>Update Address</a>
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
            <Route path="/facilities" render = {() => (<SelectPage latitude={this.state.latitude} longitude={this.state.longitide} city={this.state.city} state={this.state.state}/>)}/>
            <Route path="/update/:id" render = {() => (<UpdateAddress id={this.props.auth.user.id}/>)}/>
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
