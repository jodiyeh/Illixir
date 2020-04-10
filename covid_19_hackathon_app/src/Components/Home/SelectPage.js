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
    alert(JSON.stringify(this.props.history));
    alert(this.props.location.search);
    const params = new URLSearchParams(this.props.location.search);
    alert(params.get("state"))
    this.setState({
      state: this.props.location.search.state,
    })
  }
  render(){
    return(
      <div>
        <div>Select Page</div>
        <div>Your Address: {this.state.city} {this.state.state}</div>
        <div>Change Address</div>
        <div>Hospitals</div>
      </div>
    )
  }
}

export default SelectPage
