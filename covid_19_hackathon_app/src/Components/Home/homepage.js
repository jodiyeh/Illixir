import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import SelectPage from './SelectPage';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { google } from 'google-maps';


class Home extends Component{
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.autocomplete = null;
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
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

  componentDidMount(){
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)

    axios.get('http://localhost:5000/api/users/'+this.props.id)
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
          <h1 className = "home-title">#discover!</h1>
          <div className = "home-description">welcome! enter your to discover nearby hospitals, pharmacies, shelters, emergency medical centers, and more!</div>
          <Button variant="outlined" color="primary" component={Link} to={"/select?state="+this.state.userState+"&city="+this.state.userCity+"&streetAddress="+this.state.userStreetAddress+"&zipcode="+this.state.userZipcode}>
            search your current address
          </Button>
          <Button variant="outlined" color="primary" component={Link} to={"/update/"+this.props.id}>
            update address
          </Button>
          <div className="home-description">search different address:</div>
        </div>
        <form className="home-search" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input id="autocomplete" className="input-field" ref="input" type="text"/>
            <div className="search-title">street address: </div>
            <input
              name="streetAddress"
              type="text"
              className="form-control"
              value={this.state.streetAddress}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">city: </div>
            <input
              name="city"
              type="text"
              className="form-control"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">state: </div>
            <input
              name="state"
              type="text"
              className="form-control"
              value={this.state.state}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">zipcode: </div>
            <input
              name="zipcode"
              type="text"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
          </div>
          <Button variant="outlined" color="primary" component={Link} to={"/select?state="+this.state.state+"&city="+this.state.city+"&streetAddress="+this.state.streetAddress+"&zipcode="+this.state.zipcode}>
            search address
          </Button>
        </form>
      </div>
    )
  }
}

export default Home
