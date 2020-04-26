import React, { Component } from 'react';
import axios from 'axios';
import "./Styles/UpdatePage.css";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typing from 'react-typing-animation';

export default class UpdateAddress  extends Component {
  constructor (){
    super();
    this.autocomplete = null;
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeZipcode = this.onChangeZipcode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      state: '',
      city: '',
      streetAddress: '',
      zipcode: '',
      initialState: '',
      initialCity: '',
      initialAddress: '',
      initialZip: '',
    }
  }

  componentDidMount() { // called before anything is displayed

    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      initialState: params.get("state"),
      initialCity: params.get("city"),
      initialAddress: params.get("address"),
      initialZip: params.get("zipcode"),
      id: params.get("id"),
    })
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    axios.get('http://localhost:5000/api/users/'+params.get("id"))
      .then(response => {
        this.setState({
          state: response.data.state,
          city: response.data.city,
          streetAddress: response.data.streetAddress,
          zipcode: response.data.zipcode,

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

  onChangeState(e){
    this.setState({
      state: e.target.value
    });
  }

  onChangeCity(e){
    this.setState({
      city: e.target.value
    });
  }

  onChangeAddress(e){
    this.setState({
      streetAddress: e.target.value
    });
  }

  onChangeZipcode(e){
    this.setState({
      zipcode: e.target.zipcode
    });
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
    };
    axios.post('http://localhost:5000/api/users/update/'+this.props.id, user)
      .then(res => console.log(res.data));
    window.location = '/home';
  }

  render (){
    return (
      <div className="sidebar-page">
        <div className="update-content">
          <div className="titleContainer">
          <div className="update-title-section">
            <div className="update-title">
            Want to change your address?
            </div>
            <div className="update-title-description">
            Your curent address is {this.state.initialAddress}, {this.state.initialCity}, {this.state.initialState}, {this.state.initialZip}.
            </div>
          </div>
          </div>
          <div className="update-title-section">
            <div className="update-title">Find Address</div>
          </div>
          <div className="update-search">

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <div className="search-title">Look Up Location: </div>
          <input id="autocomplete" className="input-field" ref="input" type="text"/>
            <div className="search-title">Street Address: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.streetAddress}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <div className="search-title">City: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.city}
              onChange={this.onChangeCity}
            />
          </div>
          <div className="form-group">
            <div className="search-title">State: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.state}
              onChange={this.onChangeState}
            />
          </div>
          <div className="form-group">
            <div className="search-title">Zipcode: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChangeZipcode}
            />
          </div>
          <div className="update-button-section">
          <div className="update-button" onClick={this.onSubmit}>Update</div>


          </div>
        </form>
        </div>
        </div>
      </div>
    )
  }
}
