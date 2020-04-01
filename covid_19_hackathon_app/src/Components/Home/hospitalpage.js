import React, {Component } from 'react';
import axios from 'axios';

class HospitalPage extends Component{
  constructor(props) {
    super();
    this.state = {
      city: props.city,
      state: props.state,
      hospitals: []
    };
  }

  componentDidMount(){
    alert("hospital page");
    axios.get('http://localhost:5000/api/hospitals/')
      .then(response => {
        alert("response");
        alert("RESPONSE: " + JSON.stringify(response));
        this.setState({
          hospitals: response,
        })
      })
      .catch(error => {
        alert(error);
        console.log("ERROR: " + error);
      });
  }

  render(){
    return(
      <div>
        {this.state.city}{this.state.state}
        hi{JSON.stringify(this.state.hospitals)}
      </div>
    )
  }
}

export default HospitalPage
