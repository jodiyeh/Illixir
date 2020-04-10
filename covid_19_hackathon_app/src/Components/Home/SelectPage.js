import React, {Component } from 'react';

class SelectPage extends Component{
  constructor(props) {
    super();
    this.state = {
      city: props.city,
      state: props.state,
      latitude: props.latitude,
      longitude: props.longitude,
    };
  }

  render(){
    return(
      <div>
        <div>Select Page</div>
        <div>Your Address:</div>
        <div>Change Address</div>
        <div>Hospitals</div>
      </div>
    )
  }
}

export default SelectPage
