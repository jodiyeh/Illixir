import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import SelectPage from './SelectPage';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
      <div className="sidebar-page">
        <div className="home-content">
          <h1 className = "home-title">#discover!</h1>
          <div className = "home-description">welcome! enter your to discover nearby hospitals, pharmacies, shelters, emergency medical centers, and more!</div>
          <Button variant="outlined" color="primary" component={Link} to={"/facilities?state="+this.state.userState+"&city="+this.state.userCity+"&streetAddress="+this.state.userStreetAddress+"&zipcode="+this.state.userZipcode}>
            search your current address
          </Button>
          <Button variant="outlined" color="primary" component={Link} to={"/update/"+this.props.id}>
            update address
          </Button>
          <div className="home-description">search different address:</div>
        </div>
        <form className="home-search" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="search-title">street address: </div>
            <input
              id="streetAddress"
              type="text"
              className="form-control"
              value={this.state.streetAddress}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">city: </div>
            <input
              id="city"
              type="text"
              className="form-control"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">state: </div>
            <input
              id="state"
              type="text"
              className="form-control"
              value={this.state.state}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <div className="search-title">zipcode: </div>
            <input
              id="zipcode"
              type="text"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
          </div>
          <Button variant="outlined" color="primary" component={Link} to={"/facilities?state="+this.state.state+"&city="+this.state.city+"&streetAddress="+this.state.streetAddress+"&zipcode="+this.state.zipcode}>
            search address
          </Button>
        </form>
      </div>
    )
  }
}

export default Home
