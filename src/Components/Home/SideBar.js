import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './HomePage';
import InfoPage from './infopage';
import FAQPage from './FAQPage';
import SelectPage from './SelectPage';
import UpdateAddress from './UpdateAddressPage';
import FacilityList from './FacilityListPage';
import FacilityPage from './FacilityPage';
import AboutPage from './AboutPage';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, Switch, useLocation} from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Styles/SideBar.css';
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

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
  onHomeClick = e => {
    e.preventDefault();
    window.location.href = "/facilityfinder/home";
  };
  onUpdateClick = e => {
    e.preventDefault();
    window.location = "/facilityfinder/update?state="+this.state.state+"&city="+this.state.city+"&address="+this.state.streetAddress+"&zipcode="+this.state.zipcode
    +"&id="+this.props.auth.user.id


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
      <div className="application">
        <AppBar className="appbar" position="static" style={{ background: '#77A6F7' }}>
          <Toolbar className="appbar">
          <div className="sidebar-container">
          <div className="sidebar-header">
          <FontAwesomeIcon size="1x" color="white" icon={faShieldVirus}/>
          &nbsp;Illixir
          </div>
          <div className="sidebar-links">
          <div className="sidebar-header-element" onClick={this.onHomeClick}>Home</div>
          </div>
          <div className="sidebar-links">
          <div className="sidebar-header-element" onClick={this.onUpdateClick}>Update Address</div>
          </div>
          <div className="sidebar-links">
          <div className="sidebar-header-element" onClick={this.onLogoutClick}>Logout</div>
          </div>
          </div>

          </Toolbar>
        </AppBar>


        <Switch className="switch">
          <Route path="/facilityfinder/home" render = {() => (<HomePage id={this.props.auth.user.id}/>)}/>
          <Route path="/facilityfinder/update" component = {UpdateAddress}/>
          <Route path="/facilityfinder/select" component = {SelectPage}/>
          <Route path="/facilityfinder/facility" component = {FacilityList}/>
          <Route path="/facilityfinder/information" component = {FacilityPage}/>
          <Route path="/facilityfinder/about" component = {AboutPage}/>
          <Route path="/facilityfinder/FAQ" component = {FAQPage}/>
        </Switch>


        <MDBFooter className="font-small pt-4 mt-4" style={{ background: '#D2FDFF' }}>
      <MDBContainer fluid className="text-center text-md-left footer">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="footer-title" style={{ color: '#77A6F7' }}>Illixir</h5>
            <p className="footer-description" style={{ color: '#77A6F7' }}>
              A web application developed by Duke Students.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="footer-text1">Explore:</h5>
            <ul>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} href="/facilityfinder/home">Home</a>
              </li>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} href="/facilityfinder/about">About</a>
              </li>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} onClick={this.onUpdateClick}>Update Address</a>
              </li>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} href="/facilityfinder/FAQ">FAQ</a>
              </li>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} href="">Contact Us</a>
              </li>
              <li className="footer-text">
                <a style={{ color: '#77A6F7' }} onClick={this.onLogoutClick}>Logout</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-" style={{ background: '#77A6F7' }}>
        <MDBContainer fluid>
          Created By: Lorne & Brian, Last Updated: 5/8/2020
        </MDBContainer>
      </div>
    </MDBFooter>
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
