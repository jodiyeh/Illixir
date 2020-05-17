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


class ProductListPage extends Component{

    render(){
    return(
      <div className = "Remedy-Home">
      <div className="home-content">
        <div className="home-title-section">
          <div className="titleContainer">
            <div className="home-title">
              Products
            </div>
          </div>
        </div>
      </div>

          <div className="remedy-content">
          <div className="home-title-section">
            <div className="home-steps-title">Here are some recommended products.</div>
          </div>
            <div className="remedy-conditions">
              <div className="condition-card">
                a
              </div>
              <div className="condition-card">
                b
              </div>
              <div className="condition-card">
                c
              </div>
            </div>

          </div>
      </div>
    )
  }
}

export default ProductListPage
