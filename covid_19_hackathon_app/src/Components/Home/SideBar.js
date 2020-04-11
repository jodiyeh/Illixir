import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './HomePage';
import InfoPage from './infopage';
import SelectPage from './SelectPage';
import UpdateAddress from './UpdateAddressPage';
import FacilityList from './FacilityListPage';
import FacilityPage from './FacilityPage';
import {HeaderRow, Layout, Header, Navigation, Drawer,Textfield, Content, FooterLinkList, Footer, FooterSection, FooterDropDownSection} from 'react-mdl';
import { Route, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SideBar.css';
import Button from '@material-ui/core/Button';

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
        <Layout >
        <Header title="Covid 19 App" scroll>
           <div className="sidebar-header-container">
            <a className="sidebar-header-element" href={"/home"}>FAQ</a>
            <a className="sidebar-header-element" href={"/home"}>Tell Friends</a>
            <a className="sidebar-header-element" href={"/home"}>Add Database</a>
            <a className="sidebar-header-element" href={"/home"}>Contact Us</a>
            <a className="sidebar-header-element" onClick={this.onLogoutClick}>Logout</a>
           </div>
       </Header>
          <Drawer title={"Hey there, "+this.state.username.split(" ")[0] + "!"}>
            <div className="sidebar-drawer-container">
            <Link className="sidebar-header-element" href={"/home"}>Home</Link>
            <a className="sidebar-header-element" href={"/update/" + this.props.auth.user.id}>Update Address</a>
            <a className="sidebar-header-element" onClick={this.onLogoutClick}>Logout</a>
            </div>
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
          <Footer size="mega">
      <FooterSection type="middle">
          <FooterDropDownSection title="Features">
              <FooterLinkList>
                  <a href="#">About</a>
                  <a href="#">Terms</a>
                  <a href="#">Partners</a>
                  <a href="#">Updates</a>
              </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="Details">
              <FooterLinkList>
                  <a href="#">Specs</a>
                  <a href="#">Tools</a>
                  <a href="#">Resources</a>
              </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="Technology">
              <FooterLinkList>
                  <a href="#">How it works</a>
                  <a href="#">Patterns</a>
                  <a href="#">Usage</a>
                  <a href="#">Products</a>
                  <a href="#">Contracts</a>
              </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="FAQ">
              <FooterLinkList>
                  <a href="#">Questions</a>
                  <a href="#">Answers</a>
                  <a href="#">Contact Us</a>
              </FooterLinkList>
          </FooterDropDownSection>
      </FooterSection>
      <FooterSection type="bottom" logo="Title">
          <FooterLinkList>
              <a href="#">Help</a>
              <a href="#">Privacy & Terms</a>
          </FooterLinkList>
      </FooterSection>
  </Footer>
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
