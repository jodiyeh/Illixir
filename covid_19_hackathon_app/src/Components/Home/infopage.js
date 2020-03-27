import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class InfoPage extends Component{
    render() {
        return (
          <Map google={this.props.google} zoom={14}>

            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>

            </InfoWindow>
          </Map>
        );
      }
 }

 export default GoogleApiWrapper({
    apiKey: ('AIzaSyATfqDvOYhuTkacoeFvXzrvbgGIYw7YwWM')
  })(InfoPage) 
