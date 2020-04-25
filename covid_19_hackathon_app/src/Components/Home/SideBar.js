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
    window.location.href = "/home";
  };
  onUpdateClick = e => {
    e.preventDefault();
    window.location.href = "/update/"+this.props.auth.user.id;
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
        <Switch>
          <Route path="/home" render = {() => (<HomePage id={this.props.auth.user.id}/>)}/>
          <Route path="/update/:id" render = {() => (<UpdateAddress id={this.props.auth.user.id}/>)}/>
          <Route path="/select" component = {SelectPage}/>
          <Route path="/facility" component = {FacilityList}/>
          <Route path="/information" component = {FacilityPage}/>
          <Route path="/about" component = {AboutPage}/>
          <Route path="/FAQ" component = {FAQPage}/>
        </Switch>
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
