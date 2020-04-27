/*global google*/
import React, {Component } from 'react';
import axios from 'axios';
import InfoPage from './infopage';
import "./Styles/FacilityPage.css";
import Fade from 'react-reveal/Fade';


const Review = props => (
  <Fade bottom>
  <div className="review">
    <div>
      <span className="review-text">{props.review.author_name}</span> gave a rating of <span className="review-text">{props.review.rating}</span> about {props.review.relative_time_description}.
    </div>
    "{props.review.text}"
  </div>
  </Fade>
)

const OpeningHour = props => (
  <Fade bottom>
  <div className="hours-text">{props.timeSlot}</div>
  </Fade>
)
//const Places: GooglePlaces = require("google-places-web").default; // instance of GooglePlaces Class;


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
function capitalize(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetter(string) {
  var ret = '';
  var strs = string.split(' ');
  for(var i=0; i<strs.length; i++){
    ret += capitalize(strs[i]) + ' ';
  }
  return ret.slice(0,ret.length-1);
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
      businessStatus: "",
      formatedPhone: "",
      openingHours: [],
      rating: "",
      ratingNumber: "",
      reviews: [],
      website: "",
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
    //const geoResponse = getGeoCode(params.get("facilityAddress") + ", " + params.get("facilityCity") + ", " + params.get("facilityState"));
    const geoResponse = getGeoCode(params.get("facilityName"));

    geoResponse.then((result)=>{
    place_id = result.json.results[0].place_id;
    this.setState({
      placeId: place_id,
    });
    axios.get('http://localhost:5000/api/GoogleMapsApi/place/', {
      params: {
        placeId: place_id
      }
    }).then(response => {

      if('opening_hours' in response.data.json.result){
        this.setState({
          openingHours: response.data.json.result.opening_hours.weekday_text,
        })
      }else{
        this.setState({
          openingHours: ["N/a"],
        })
      }
      if('formatted_phone_number' in response.data.json.result){
        this.setState({
          formatedPhone: response.data.json.result.formatted_phone_number,
        })
      }
      else{
        this.setState({
          formatedPhone: "N/a",
        })
      }
      if('rating' in response.data.json.result){
        this.setState({
          rating: response.data.json.result.rating,
        })
      }
      else{
        this.setState({
          rating: "N/a",
        })
      }
      if('user_ratings_total' in response.data.json.result){
        this.setState({
          ratingNumber: response.data.json.result.user_ratings_total,
        })
      }
      else{
        this.setState({
          ratingNumber: "N/a"
        })
      }
      if('reviews' in response.data.json.result){
        this.setState({
          reviews: response.data.json.result.reviews,
        })
      }
      else{
        this.setState({
          reviews: [{
            author_name: "N/a",
            rating: "N/a",
            relative_time_description: "N/a",
            text: "N/a",

          }],
        })
      }
      if('website' in response.data.json.result){
        this.setState({
          website: response.data.json.result.website,
        })
      }
      else{
        this.setState({
          website: "N/a",
        })
      }
      if('business_status' in response.data.json.result){
        this.setState({
          businessStatus: response.data.json.result.business_status,
        })
      }
      else{
        this.setState({
          businessStatus: "N/a",
        })
      }


    })

    // const placeResponse = getPlaceDetails(place_id);
    // placeResponse.then((result)=>{
    // alert(result)

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
  reviewList() {
    return this.state.reviews.map(current => {
      return <Review review={current}/>;
    })
  }
  openingHoursList() {
    return this.state.openingHours.map(current => {
      return <OpeningHour timeSlot={current}/>;
    })
  }
    render(){
    return(
      <div className="sidebar-page">
        <div className="facility-content">
        <div className="page-title-section">
          <div className="titleContainer">
          <Fade bottom>
          <div className="page-title">
          {this.capitalizeFirstLetter(this.state.facilityName)}
          </div>
          </Fade>

        </div>

        </div>
        </div>
        <div className="facility-info">
          <div className="facility-info-container">

            <div className="facility-info-content">
              <div className="information-box">
                <div className="info-title">
                  Information:
                </div>
                <Fade bottom>
                <div>Address: <span className="info-text">{capitalizeFirstLetter(this.state.facilityAddress)}</span>, <span className="info-text">{capitalizeFirstLetter(this.state.facilityCity)}</span>, <span className="info-text">{capitalizeFirstLetter(this.state.facilityState)}</span>.</div>
                <div>Distance: <span className="info-text">{this.state.distance}</span> miles.</div>
                <div>Rating: <span className="info-text">{this.state.rating}</span> from <span className="info-text">{this.state.ratingNumber}</span> ratings.</div>
                <div>Operation Status: <span className="info-text">{this.state.businessStatus}</span>.</div>
                <div>Phone Number: <span className="info-text">{this.state.formatedPhone}</span>.</div>
                <div>Website: <span className="info-text">{this.state.website}</span>.</div>
                </Fade>
              </div>
                <div className="hours-box"><div className="info-title">Operational Hours:</div> {this.openingHoursList()}</div>
                <div className="reviews-box"><div className="info-title">Reviews:</div> {this.reviewList()}</div>
              </div>
          </div>
          <div className="facility-maps-container">
            <InfoPage facilityAddress={this.state.facilityName} userAddress={this.state.streetAddress} userLat={this.state.userLatitude} userLong={this.state.userLongitude} facilityLat={this.state.latitude} facilityLong={this.state.longitude}/>
          </div>
          <div id="map"></div>
        </div>
      </div>
    )
  }
}
export default FacilityPage
