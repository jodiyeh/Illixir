import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './homepage';
import InfoPage from './infopage';
import SelectPage from './SelectPage';
import UpdateAddress from './UpdateAddress';
import FacilityList from './FacilityList';
import FacilityPage from './FacilityPage';
import {Layout, Header, Navigation, Drawer,Textfield, Content} from 'react-mdl';
import { Route, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "../PrivateRoute/privateroute";
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SideBar.css';

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
      <div className="sidebar">
        <Layout fixedHeader fixedDrawer>
          <Header className= "header-color" title="Covid-19 App" scroll>
          </Header>
          <Drawer title={"Hey there, "+this.state.username.split(" ")[0] + "!"}>
            <Navigation style={{height: '50vh'}}>
            <a href={"/home"}>Home</a>
            <a href={"/update/" + this.props.auth.user.id}>Update Address</a>
            <a onClick={this.onLogoutClick}>Logout</a>
            </Navigation>
          </Drawer>
          <Content className="sidebar-content">
            <Switch>
              <Route path="/home" render = {() => (<HomePage id={this.props.auth.user.id}/>)}/>
              <Route path="/update/:id" render = {() => (<UpdateAddress id={this.props.auth.user.id}/>)}/>
              <Route path="/select" component = {SelectPage}/>
              <Route path="/facility" component = {FacilityList}/>
              <Route path="/information" component = {FacilityPage}/>
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