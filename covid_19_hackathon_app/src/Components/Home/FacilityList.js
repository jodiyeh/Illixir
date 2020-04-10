import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Facility = props => (
  <tr>
    <td>{ props.facility.attributes.NAME }</td>
    <td>{ props.facility.attributes.ADDRESS }</td>
    <td>{ props.facility.attributes.CITY }</td>
    <td>{ props.facility.attributes.STATE }</td>
    <td>{ props.facility.attributes.LATITUDE }</td>
    <td>{ props.facility.attributes.LONGITUDE }</td>
  </tr>
)

class FacilityList extends Component{
  constructor(props) {
    super();
    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      facility: "",
      zipcode: "",
      streetAddress: "",
      facilities: [],
    };
  }
  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      state: params.get("state"),
      city: params.get("city"),
      zipcode: params.get("zipcode"),
      streetAddress: params.get("streetAddress"),
      facility: params.get("facility"),
      latitude: params.get("latitude"),
      longitude: params.get("longitude")
    })
    const backendRequest = "http://localhost:5000/api/"+params.get("facility")+"/";
    const cityFilter = params.get("city");
    alert(cityFilter);
    alert(backendRequest);
    axios.get(backendRequest)
      .then(response => {
        const filter1 = response.data.filter(d => d.attributes.CITY === params.get("city"));
        //const filter2 = filter1.filter(d => d.attributes.LATITUDE === this.state.latitude);
        //const filter3 = filter3.data.filter(d => d.attributes.LONGITUDE === this.state.longitide);
        alert(JSON.stringify(response.data));
        this.setState({
          facilities: filter1,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }
  facilitiesList() {
    return this.state.facilities.map(current => {
      return <Facility facility={current}/>;
    })
  }
  render(){
    return(
      <div className="sidebar-page">
      <div>
        <h3>{this.state.facility} Filtered By City</h3>
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
            { this.facilitiesList() }
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

export default FacilityList
