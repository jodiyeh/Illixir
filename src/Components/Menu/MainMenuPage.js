import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import AppBar from '@material-ui/core/AppBar';
import { connect } from "react-redux";
import Toolbar from '@material-ui/core/Toolbar';
import "./MainMenuPage.css";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from '../Home/HomePage';
import FAQPage from '../Home/FAQPage';
import SelectPage from '../Home/SelectPage';
import FacilityPage from '../Home/FacilityPage';

import AboutPage from '../Home/AboutPage';
import UpdateAddress from '../Home/UpdateAddressPage';
import FacilityList from '../Home/FacilityListPage';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";


class MainMenuPage extends Component{

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

     goToFacilityFinder= e =>{
        e.preventDefault();
        window.location.href = "/facilityfinder/home";
    };


    goToRemedy= e =>{
      e.preventDefault();
      window.location.href = "/Remedy/RemedyHome";
  };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = "../login";
      };



    render(){
        return(
        <div className = "menu-background">
        <AppBar className="appbar" position="static" style={{ background: '#77A6F7' }}>
          <Toolbar className="appbar">
          <div className="sidebar-container">
          <div className="sidebar-header">
          <FontAwesomeIcon size="1x" color="white" icon={faShieldVirus}/>
          &nbsp;Illixir
          </div>
          <div className="sidebar-links">
          <div className="sidebar-header-element" onClick={this.onLogoutClick}>Logout</div>
          </div>
          </div>
          </Toolbar>
        </AppBar>


        <div className = "Menu-title">
            Welcome to Illixir
        </div>
        <div className = "Menu-subtitle">
            The all-encompassing app for your medical needs
        </div>
        <div className = "Buttons">
            <div className = "facility-finder-button" onClick = {this.goToFacilityFinder}>
                <p>
                Facility Finder
                </p>
            </div>
            <div className = "remedy-repo-button" onClick = {this.goToRemedy} >

                <p>
                Custom Remedies
                </p>
            </div>
        </div>

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </div>
        )
    }
}

MainMenuPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(MainMenuPage);
