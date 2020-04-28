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

function googleGeoCode(address) {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k',
    Promise: Promise
  });

  return googleMapsClient.geocode({ address: address }).asPromise();
}

async function getGeoCode(address) {
  try {
    const result = await googleGeoCode(address);
    return result;
  } catch (error) {
    return "error";
  }
}


class HomePage extends Component{


  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.autocomplete = null;
    this.handleUpdate = this.handleUpdate.bind(this);

    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleSearchUserAddress = this.handleSearchUserAddress.bind(this);
    this.handleSearchCustonAddress = this.handleSearchCustonAddress.bind(this);
    this.state = {
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      userStreetAddress: "",
      userCity: "",
      userState: "",
      userZipcode: "",
    };
  }
  handleSearchUserAddress(){
    const geoResponse = getGeoCode(this.state.userStreetAddress + ", " + this.state.userCity + ", " + this.state.userState);
    geoResponse.then((result)=>{
    const lat = result.json.results[0].geometry.location.lat
    const long = result.json.results[0].geometry.location.lng
    window.location = "/select?state="+this.state.userState+"&city="+this.state.userCity+"&streetAddress="+this.state.userStreetAddress+"&zipcode="+this.state.userZipcode+"&latitude="+lat+"&longitude="+long
    console.log(result)
    }).catch((err)=>{
     console.log(err);
    })
  }
  handleSearchCustonAddress(){
    const geoResponse = getGeoCode(this.state.streetAddress + ", " + this.state.city + ", " + this.state.state);
    geoResponse.then((result)=>{
    const lat = result.json.results[0].geometry.location.lat
    const long = result.json.results[0].geometry.location.lng
    window.location = "/select?state="+this.state.state+"&city="+this.state.city+"&streetAddress="+this.state.streetAddress+"&zipcode="+this.state.zipcode+"&latitude="+lat+"&longitude="+long
    console.log(result)
    }).catch((err)=>{
     console.log(err);
    })
  }
  componentDidMount(){
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    axios.get('/api/users/'+this.props.id)
      .then(response => {
        this.setState({
          userState: response.data.state,
          userCity: response.data.city,
          userStreetAddress: response.data.streetAddress,
          userZipcode: response.data.zipcode
        })
      })
      .catch( function (error) {
        console.log(error);
      })
  }
  handleUpdate(){
    window.location = "/update?state="+this.state.userState+"&city="+this.state.userCity+"&address="+this.state.userStreetAddress+"&zipcode="+this.state.userZipcode+"&id"+this.props.id
  }
  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace()
    let address = addressObject.address_components
    var results = [];
    var city = "locality";
    var state = "administrative_area_level_1";
    var zip = "postal_code";

    for (var i=0 ; i < address.length ; i++) {
      if (address[i].types[0] == city) {
        results.push(address[i].long_name);
      }
      else if (address[i].types[0] == state) {
        results.push(address[i].short_name);
      }
      else if (address[i].types[0] == zip) {
        results.push(address[i].long_name);
      }
    }
    this.setState({
      streetAddress: `${address[0].long_name} ${address[1].long_name}`,
      city: results[0],
      state: results[1],
      zipcode: results[2],
    })
    }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };
    render(){
    return(
      <div className="sidebar-page">
        <div className="home-content">
          <div className="home-title-section">
            <div className="titleContainer">
            <div className="home-title">
            Welcome To Illixir
            </div>
            <div className="home-title-description">Discover nearby hospitals, pharmacies, shelters, emergency medical centers, and more.</div>
            </div>
          </div>
          <div className = "home-description">
            <div className="how-to-use">
              <div className="home-title-section">
              <div className="home-steps-title">How Do I Use Illixir?</div>
              </div>
              <Fade left>
              <div className="step">
              <div className="step-pic">
                <FontAwesomeIcon size="9x" color="#F78888" icon={faHouseUser} />
              </div>
                <div className="step-content">
                <div className="step-title">1. Search my address.</div>
                <div className="step-description">Your address is saved in the application so searching is one click of a button away! You can update your saved address at anytime.</div>
                </div>
              </div>
              </Fade>
              <Fade right>
              <div className="step1">
              <div className="step-pic">
                <FontAwesomeIcon size="9x" color="#77A6F7" icon={faLocationArrow} />
              </div>
                <div className="step-content">
                <div className="step-title1">2. Search an alternate address.</div>
                <div className="step-description">If you are interested in a location other than your saved address, you can fill out the form below to search another address.</div>
                </div>
              </div>
              </Fade>
              <Fade left>
              <div className="step2">

                <div className="step-pic">
                <FontAwesomeIcon size="9x" color="#F3D250" icon={faHospitalAlt} />
                </div>
                <div className="step-content">
                <div className="step-title2">3. Select a facility.</div>
                <div className="step-description">After searching an address, click the facility type you are interested in! These facilities are retrieved from federal databases and then filtered by distance from your address.</div>
                </div>
              </div>
              </Fade>
              <Fade right>
              <div className="step">

              <div className="step-pic">
              <FontAwesomeIcon size="9x" color="#F78888" icon={faRoute} />
              </div>
                <div className="step-content">
                <div className="step-title">4. Filter the facility by distance.</div>
                <div className="step-description">The default filter distance is 25 miles. You can adjust this to any distance you want and refresh the page.</div>
                </div>
              </div>
              </Fade>
              <Fade left>
              <div className="step1">

              <div className="step-pic">
              <FontAwesomeIcon size="9x" color="#77A6F7" icon={faInfoCircle} />
              </div>
                <div className="step-content">
                <div className="step-title1">5. Get the details.</div>
                <div className="step-description">Once you have located the desired facility, click the details button to learn more about the facility. Here you will be able to view the facility and your address on a map to get more insight on their locations.</div>
                </div>
              </div>
              </Fade>

              <Fade left>
              <div className="step2">

              <div className="step-pic">
              <FontAwesomeIcon size="9x" color="#F3D250" icon={faMapMarkedAlt} />
              </div>
                <div className="step-content">
                <div className="step-title2">6. View on Google Maps.</div>
                <div className="step-description">In the details section, you will find an interactive map where your search location and chosen facility are plotted! Use this map to gage how far the facility is from your location.</div>
                </div>
              </div>
              </Fade>
            </div>

          </div>
          <div className="home-info-container">
          <div className="home-info">
            Your address is currently set as <span id="your-address">{this.state.userStreetAddress}</span>, <span id="your-address">{this.state.userCity}</span>, <span id="your-address">{this.state.userState}</span>, <span id="your-address">{this.state.userZipcode}</span>. You can
            either search for facilities near your current address, update your current address, or search a customized address.
          </div>
          <div className="home-button-section">
          <Fade left>
          <div className="home-button" onTouchStart={this.handleSearchUserAddress} onClick={this.handleSearchUserAddress}>Search My Address</div>
          </Fade>
          <Fade right>
          <div className="home-button" onTouchStart={this.handleUpdate} onClick={this.handleUpdate}>Update My Address</div>
          </Fade>
          </div>
          </div>

          <div className="home-form">

          <div className="home-title-section">
          <Fade bottom>
          <div className="home-form-title">Enter A Custom Address</div>
          </Fade>
          </div>
          <Fade bottom>
          <form className="home-search" onSubmit={this.onSubmit}>
            <div className="form-group">
            <div className="search-title">Location Look Up: </div>
              <input id="autocomplete" className="input-field" ref="input" type="text"/>
              <div className="search-title">Street Address: </div>
              <input
                name="streetAddress"
                type="text"
                className="form-control"
                value={this.state.streetAddress}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <div className="search-title">City: </div>
              <input
                name="city"
                type="text"
                className="form-control"
                value={this.state.city}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <div className="search-title">State: </div>
              <input
                name="state"
                type="text"
                className="form-control"
                value={this.state.state}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <div className="search-title">Zipcode: </div>
              <input
                name="zipcode"
                type="text"
                className="form-control"
                value={this.state.zipcode}
                onChange={this.onChange}
              />
            </div>
            <Fade bottom>
            <div className="home-button-section">
            <div className="home-button-form" onTouchStart={this.handleSearchCustonAddress} onClick={this.handleSearchCustonAddress}>Search Alternate Address</div>


            </div>
            </Fade>
          </form>
          </Fade>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
