import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const keys = require("../../keys/config");
var mapStyles = {
  width: '50vw',
  height: '50vw'
};
class InfoPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userLat: this.props.userLat,
      userLong: this.props.userLong,
      facilityLat: this.props.facilityLat,
      facilityLong: this.props.facilityLong,
      myAddress: this.props.userAddress,
      facilityAddress: this.props.facilityAddress
    };
  }
  render() {

    return (
      <Map google={this.props.google} zoom={12} style={mapStyles} initialCenter={{ lat: this.state.userLat, lng: this.state.userLong}}>
        <Marker label={this.state.facilityAddress} position={{lat: this.state.facilityLat, lng: this.state.facilityLong}} />
        <Marker label={this.state.myAddress} position={{lat: this.state.userLat, lng: this.state.userLong}} />
      </Map>
    );
  }
}

 export default GoogleApiWrapper({
    apiKey: (keys.GoogleAPIKey)
  })(InfoPage)
