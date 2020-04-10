import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Facility = props => (
  <tr>
    <td>{ props.facility.attributes.NAME }</td>
    <td>{ props.facility.attributes.ADDRESS }</td>
    <td>{ props.facility.attributes.CITY }</td>
    <td>{ props.facility.attributes.STATE }</td>
    <td>
    <Button variant="outlined" color="primary" component={Link} to={
      "/information?state="+props.user.state
      +"&city="+props.user.city
      +"&streetAddress="+props.user.streetAddress
      +"&zipcode="+props.user.zipcode
      +"&facility="+props.user.facility
      +"&userLongitude="+props.user.userLongitude
      +"&userLatitude="+props.user.userLatitude
      +"&latitude="+props.facility.attributes.LATITUDE
      +"&longitude="+props.facility.attributes.LONGITUDE
    }>
      More Info
    </Button>
    </td>
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
    axios.get(backendRequest)
      .then(response => {
        const filter1 = response.data.filter(d => d.attributes.CITY === cityFilter);
        //const filter2 = filter1.filter(d => d.attributes.LATITUDE === this.state.latitude);
        //const filter3 = filter3.data.filter(d => d.attributes.LONGITUDE === this.state.longitide);
        this.setState({
          facilities: filter1,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }
  facilitiesList() {
    const user = {
      city: this.state.city,
      state: this.state.state,
      userLatitude: this.state.latitude,
      userLongitude: this.state.longitude,
      facility: this.state.facility,
      zipcode: this.state.zipcode,
      streetAddress: this.state.streetAddress,
    }
    return this.state.facilities.map(current => {
      return <Facility facility={current} user={user}/>;
    })
  }
  render(){
    return(
      <div className="sidebar-page">
      <div className="list-content">
        <h1 className="list-title">#nearby!</h1>
      </div>
      <div>
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
