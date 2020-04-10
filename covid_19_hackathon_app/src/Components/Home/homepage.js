import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import SelectPage from './SelectPage';
import axios from 'axios';

class Home extends Component{
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);

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
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };
    render(){
    return(
      <div className="landing-grid">
        <div className="container">
          <div>
            <img
              src="https://cdn2.iconfinder.com/data/icons/medical-v1-0-outline/32/Hospital-512.png"
              alt="hospital"
              className = "hosp-img"
            />
          </div>
          <div className = "Title">
            <h3>COVID-19 Facilities Finder</h3>
          </div>
          <div className = "Description">
            <div>This application matches you to nearby hospitals, pharmacies, shelters, emergency medical centers, and more!</div>
          </div>
          <Link to={"/facilities?state="+this.state.userState+"&city="+this.state.userCity+"&streetAddress="+this.state.userStreetAddress+"&zipcode="+this.state.userZipcode}>Search your current address</Link>
          <h3>Search Different Address:</h3>
          <Collapsible trigger="Search A Different Address!">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Street Address: </label>
              <input
                id="streetAddress"
                type="text"
                className="form-control"
                value={this.state.streetAddress}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>City: </label>
              <input
                id="city"
                type="text"
                className="form-control"
                value={this.state.city}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>State: </label>
              <input
                id="state"
                type="text"
                className="form-control"
                value={this.state.state}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Zipcode: </label>
              <input
                id="zipcode"
                type="text"
                className="form-control"
                value={this.state.zipcode}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <Link to={"/facilities?state="+this.state.state+"&city="+this.state.city+"&streetAddress="+this.state.streetAddress+"&zipcode="+this.state.zipcode}>Search</Link>
            </div>
          </form>
          </Collapsible>
        </div>
      </div>
    )
  }
}

export default Home
