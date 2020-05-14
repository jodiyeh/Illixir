import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { google } from 'google-maps';
import Geocode from "react-geocode";
import { faMapMarkedAlt, faHouseUser, faMapMarkerAlt, faHospitalAlt, faRoute, faInfoCircle, faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from 'react-reveal/Fade';
import Typing from 'react-typing-animation';


class HomePage extends Component{
  constructor(props) {
    super();
  }
  goToProducts = e => {
    e.preventDefault();
    window.location.href = "/customremedies/products";
  };
  goToConditions = e => {
    e.preventDefault();
    window.location.href = "/customremedies/conditions";
  };
    render(){
    return(
      <div className = "Remedy-Home">
          <div className = "Remedy-title">
              Remedy Repository
          </div>
          <div className = "Remedy-subtitle">
              Please fill out the form below
          </div>
          <div className="home-button-form" onClick={this.goToProducts}>Go To Products</div>
          <div className="home-button-form" onClick={this.goToConditions}>Go To Conditions</div>
      </div>
    )
  }
}

export default HomePage
