import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Route, Switch } from "react-router-dom";
import SelectPage from './SelectPage';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { google } from 'google-maps';
import Geocode from "react-geocode";
import "./Styles/HomePage.css";
import { faMapMarkedAlt, faHouseUser, faMapMarkerAlt, faHospitalAlt, faRoute, faInfoCircle, faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from 'react-reveal/Fade';
import Typing from 'react-typing-animation';

class RemedyHome extends Component{

    render(){
        return(
            <div className = "Remedy-Home">
                <div className = "Remedy-title">
                    Symptoms
                </div>
                <div className = "Remedy-subtitle">
                    Please select all sympyoms that you are experiencing
                </div>
            </div>
        )
    }
}

export default RemedyHome;