/*global google*/
import React, {Component } from 'react';
import axios from 'axios';
import InfoPage from './infopage';
//import Places from "google-places-web";

//const Places: GooglePlaces = require("google-places-web").default; // instance of GooglePlaces Class;

//Places.apiKey = "AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k";

// function googlePlacesSearch(address) {
//   const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k',
//     Promise: Promise
//   });
//
//   return googleMapsClient.places({ address: address }).asPromise();
// }
//
// async function getPlacesSearch(address) {
//   try {
//     const result = await googlePlacesSearch(address);
//     return result;
//   } catch (error) {
//     return "error";
//   }
// }
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        var request = {
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
          fields: ['name', 'formatted_address', 'place_id', 'geometry']
        };

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        alert("hi")
        service.getDetails(request, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
      }

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


class FacilityPage extends Component{
  constructor() {
    super();
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.details = null;
    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      facility: "",
      zipcode: "",
      streetAddress: "",
      userLatitude: "",
      userLongitude: "",
      facilityAddress: "",
      facilityName: "",
      facilityState: "",
      facilityCity: "",
      distance: "",
      placeId: "",
    };
  }

  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      state: params.get("state"),
      city: params.get("city"),
      zipcode: params.get("zipcode"),
      streetAddress: params.get("streetAddress"),
      facility: params.get("facility"),
      userLatitude: params.get("userLatitude"),
      userLongitude: params.get("userLongitude"),
      latitude: params.get("latitude"),
      longitude: params.get("longitude"),
      facilityAddress: params.get("facilityAddress"),
      facilityName: params.get("facilityName"),
      facilityCity: params.get("facilityCity"),
      facilityState: params.get("facilityState"),
      distance: params.get("distance"),
    });
    var place_id = "";
    const geoResponse = getGeoCode(params.get("facilityAddress") + ", " + params.get("facilityCity") + ", " + params.get("facilityState"));
    geoResponse.then((result)=>{
    place_id = result.json.results[0].place_id;
    this.setState({
      placeId: place_id,
    });
    initMap();

  })
}

  capitalize(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeFirstLetter(string) {
    var ret = '';
    var strs = string.split(' ');
    for(var i=0; i<strs.length; i++){
      ret += this.capitalize(strs[i]) + ' ';
    }
    return ret.slice(0,ret.length-1);
  }
    render(){
    return(
      <div className="sidebar-page">
        <div className="facility-content">
        <div className="page-title-section">
          <div className="titleContainer">
          <div className="page-title">
          {this.capitalizeFirstLetter(this.state.facilityName)}
          </div>

        </div>

        </div>
        </div>
        <div className="facility-info">
          <div className="facility-info-container">
            <div className="facility-info-title">
              {this.state.facilityName}
            </div>
            <div className="facility-info-content">
              <div>Address: {this.state.facilityAddress}, {this.state.facilityCity}, {this.state.facilityState}</div>
              <div>Distance: {this.state.distance} miles</div>
              <div className="facility-map-link">
                Link to google maps
              </div>
            </div>
          </div>
          <div className="facility-maps-container">
            <InfoPage facilityAddress={this.state.facilityAddress} userAddress={this.state.streetAddress} userLat={this.state.userLatitude} userLong={this.state.userLongitude} facilityLat={this.state.latitude} facilityLong={this.state.longitude}/>
          </div>
        </div>
      </div>
    )
  }
}

export default FacilityPage
