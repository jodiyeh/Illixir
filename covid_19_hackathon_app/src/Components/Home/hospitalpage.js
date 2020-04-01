import React, {Component } from 'react';
import axios from 'axios';


const Hospital = props => (
  <tr>
    <td>{ props.hospital.attributes.NAME }</td>
    <td>{ props.hospital.attributes.ADDRESS }</td>
    <td>{ props.hospital.attributes.CITY }</td>
    <td>{ props.hospital.attributes.STATE }</td>
    <td>{ props.hospital.attributes.LATITUDE }</td>
    <td>{ props.hospital.attributes.LONGITUDE }</td>
  </tr>
)

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
    axios.get('http://localhost:5000/api/hospitals/')
      .then(response => {
        const arr1 = response.data.filter(d => d.attributes.CITY === "MOUNTAIN VIEW");
        this.setState({
          hospitals: arr1,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

  hospitalList() {
    return this.state.hospitals.map(currenthospital => {
      return <Hospital hospital={currenthospital}/>;
    })
  }

  render(){
    return(
      <div>
        <h3>Hospitals Filtered By City</h3>
        <table className="table">
          <thread className="thread-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thread>
          <tbody>
            { this.hospitalList() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default HospitalPage
