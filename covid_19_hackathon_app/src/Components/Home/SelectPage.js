import React, {Component } from 'react';

class SelectPage extends Component{
  constructor(props) {
    super();
    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: ""
    };
  }
  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      state: params.get("state"),
      city: params.get("city"),
      zipcode: params.get("zipcode"),
      streetAddress: params.get("streetAddress"),
    })
  }
  render(){
    return(
      <div className="sidebar-page">
        <div className="select-content">
          <h1 className="select-title">#category!</h1>
        </div>
        <div>Your Address: {this.state.streetAddress} {this.state.city} {this.state.state} {this.state.zipcode}</div>
        <div>Change Address</div>
        <div>Hospitals</div>
      </div>
    )
  }
}

export default SelectPage
