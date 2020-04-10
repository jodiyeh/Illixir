import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateAddress  extends Component {
  constructor (props){
    super(props);
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
    }
  }

  componentDidMount() { // called before anything is displayed
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    axios.get('http://localhost:5000/api/users/'+this.props.id)
      .then(response => {
        this.setState({
          state: response.data.state,
          city: response.data.city,
          streetAddress: response.data.streetAddress,
          zipcode: response.data.zipcode
        })
      })
      .catch( function (error) {
        console.log(error);
      })
  }

  handlePlaceSelect() {
    //address[7].long_name
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
      alert(JSON.stringify(address))
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
          <h1 className="update-title">#home!</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <input id="autocomplete" className="input-field" ref="input" type="text"/>
            <div className="search-title">street address: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.streetAddress}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <div className="search-title">city: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.city}
              onChange={this.onChangeCity}
            />
          </div>
          <div className="form-group">
            <div className="search-title">state: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.state}
              onChange={this.onChangeState}
            />
          </div>
          <div className="form-group">
            <div className="search-title">zipcode: </div>
            <input
              type="text"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChangeZipcode}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update!" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
