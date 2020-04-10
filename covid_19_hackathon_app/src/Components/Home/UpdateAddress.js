import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateAddress  extends Component {
  constructor (props){
    super(props);

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
      <div>
        <h3>Update Address</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Street Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.streetAddress}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <label>City: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.city}
              onChange={this.onChangeCity}
            />
          </div>
          <div className="form-group">
            <label>State: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.state}
              onChange={this.onChangeState}
            />
          </div>
          <div className="form-group">
            <label>Zipcode: </label>
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
