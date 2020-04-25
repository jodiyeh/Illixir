import React, {Component } from 'react';
import axios from 'axios';
import InfoPage from './infopage';
class FacilityPage extends Component{
  constructor() {
    super();
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
      distance: params.get("distance")
    })
  }
    render(){
    return(
      <div className="sidebar-page">
        <div className="facility-content">
          <h1 className="facility-title">#details!</h1>
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
