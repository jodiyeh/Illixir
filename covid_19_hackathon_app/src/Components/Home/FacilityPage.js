import React, {Component } from 'react';
import axios from 'axios';

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
      targetFacility: "",
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
      longitude: params.get("longitude")
    })
    const backendRequest = "http://localhost:5000/api/"+params.get("facility")+"/";
    const latitudeFilter = params.get("latitude");
    const longitudeFilter = params.get("longitude");
    axios.get(backendRequest)
      .then(response => {
        const filter1 = response.data.filter(d => d.attributes.LATITUDE == latitudeFilter);
        const filter2 = filter1.filter(d => d.attributes.LONGITUDE == longitudeFilter);
        this.setState({
          targetFacility: filter2,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }
    render(){
    return(
      <div className="sidebar-page">
        <div className="facility-content">
          <h1 className="facility-title">#details!</h1>
          <div>Informatin to work with</div>
        </div>
        <div>Street Address: {this.state.streetAddress}</div>
        <div>City: {this.state.city}</div>
        <div>State: {this.state.state}</div>
        <div>Zipcode: {this.state.zipcode}</div>
        <div>Facility: {this.state.facility}</div>
        <div>User Longitude: {this.state.userLatitude}</div>
        <div>User Longitude: {this.state.userLongitude}</div>
        <div>Facility Latitude: {this.state.latitude}</div>
        <div>Facility Longitude: {this.state.longitude}</div>
      </div>
    )
  }
}

export default FacilityPage
