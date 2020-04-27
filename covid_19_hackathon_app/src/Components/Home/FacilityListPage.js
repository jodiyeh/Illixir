import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';

const stringDict = {
  "hospital":"Hospitals",
  "nursingHomes":"Nursing Homes",
  "emergencyServices":"Emergency Medical Service Stations",
  "urgentCare":"Urgent Care Facilities",
  "veteranHealth":"Veteran Health Administrations",
  "emergencyOps":"Local Emergency Operations",
}

function capitalize(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetter(string) {
  var ret = '';
  var strs = string.split(' ');
  for(var i=0; i<strs.length; i++){
    ret += capitalize(strs[i]) + ' ';
  }
  return ret.slice(0,ret.length-1);
}

const Facility = props => (
  <Fade bottom>
  <tr className='list-container' style={{ fontSize: "1.7vh" }}>
    <td>{ capitalizeFirstLetter(props.facility.attributes.NAME) }. { capitalizeFirstLetter(props.facility.attributes.ADDRESS) }, { capitalizeFirstLetter(props.facility.attributes.CITY) }, { props.facility.attributes.STATE }</td>
    <td>{(Math.round(69 * 100 * Math.sqrt(Math.pow(props.facility.geometry.y - props.user.userLatitude, 2) + Math.pow(props.facility.geometry.x - props.user.userLongitude, 2)))/100)} miles</td>
    <td>
    <Button variant="outlined" style={{ backgroundColor: '#77A6F7', textTransform: 'none', fontFamily: 'Didact Gothic', }} component={Link} to={
      "/information?state="+props.user.state
      +"&city="+props.user.city
      +"&streetAddress="+props.user.streetAddress
      +"&zipcode="+props.user.zipcode
      +"&facility="+props.user.facility
      +"&userLongitude="+props.user.userLongitude
      +"&userLatitude="+props.user.userLatitude
      +"&latitude="+props.facility.geometry.y
      +"&longitude="+props.facility.geometry.x
      +"&facilityName="+props.facility.attributes.NAME
      +"&facilityAddress="+props.facility.attributes.ADDRESS
      +"&facilityCity="+props.facility.attributes.CITY
      +"&facilityState="+props.facility.attributes.STATE
      +"&distance="+(Math.round(69 * 100 * Math.sqrt(Math.pow(props.facility.geometry.y - props.user.userLatitude, 2) + Math.pow(props.facility.geometry.x - props.user.userLongitude, 2)))/100)
    }>
    Details
    </Button>
    </td>
  </tr>
  </Fade>
)


class FacilityList extends Component{
  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      facility: "",
      zipcode: "",
      streetAddress: "",
      facilities: [],
      distance: "",
    };
}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value / 69 });
  }
  handleClick(){
    window.location = "/facility?facility="+this.state.facility
      +"&state="+this.state.state
      +"&city="+this.state.city
      +"&streetAddress="+this.state.streetAddress
      +"&zipcode="+this.state.zipcode
      +"&latitude="+this.state.latitude
      +"&longitude="+this.state.longitude
      +"&distance="+this.state.distance
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
      longitude: params.get("longitude"),
      distance: params.get("distance")
    })


    axios.get('http://localhost:5000/api/'+params.get("facility")+'/', {
      params: {
        lat: params.get("latitude"),
        long: params.get("longitude"),
        distance: params.get("distance"),
      }
    })
      .then(response => {
        //const data = response.data.filter(d => d.attributes.CITY = params.get("city") );



        //const filter2 = filter1.filter(d => Math.abs(d.attributes.LONGITUDE - this.state.longitude) < .36 );
        // const filter3 = filter2.sort(function(a, b) {
        //   return a.attributes.LONGITUDE - b.attributes.LONGITUDE;
        // });
        // filter3.sort(function(a, b) {
        //   return a.attributes.LATITUDE - b.attributes.LATITUDE;
        // });
        const data = response.data.filter(d => Math.sqrt(Math.pow((d.geometry.y - params.get("latitude")), 2) + Math.pow((d.geometry.x - params.get("longitude")), 2)) < this.state.distance);
        data.sort(function(a, b) {
          var distance_a = Math.sqrt(Math.pow((a.geometry.y - params.get("latitude")), 2) + Math.pow((a.geometry.x - params.get("longitude")), 2));
          var distance_b = Math.sqrt(Math.pow((b.geometry.y - params.get("latitude")), 2) + Math.pow((b.geometry.x - params.get("longitude")), 2));
          return distance_a - distance_b;
        });
        this.setState({
          facilities: data,
        })
      })
      .catch(error => {
        console.log("ERROR: " + error);
      });
  }

    //var geocoder = new window.google.maps.Geocoder();
    //var address = params.get("streetAddress") + ", " + params.get("city") + ", " + params.get("state") + " " + params.get("zipcode");
    //var address = params.get("streetAddress") + ", " + params.get("city") + ", " + params.get("state") + " " + params.get("zipcode")
    //this.geoAddress(geocoder, address, params.get("facility"));

  // geoAddress(geocoder, address, facility){
  //   alert("geocod");
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status == window.google.maps.GeocoderStatus.OK) {
  //       var lat = results[0].geometry.location.lat();
  //       var long = results[0].geometry.location.lng();
  //       alert(lat);
  //       alert(long);
  //       const backendRequest = "http://localhost:5000/api/"+facility+"/";
  //       axios.get(backendRequest)
  //         .then(response => {
  //           alert(JSON.stringify(response.data));
  //           const f1 = response.data.filter(d => Math.abs(d.attributes.LATITUDE - lat) < 2);
  //           alert("F1: "+ JSON.stringify(f1));
  //
  //           const f2 = f1.filter(d => Math.abs(d.attributes.LONGITUDE - long) < 2);
  //           alert("F2 "+ JSON.stringify(f2));
  //           this.setState({
  //             facilities: f2,
  //           })
  //         })
  //         .catch(error => {
  //           console.log("ERROR: " + error);
  //           return "error";
  //         });
  //     }
  //     else{
  //       alert("no");
  //     }
  //   })
  // }


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
    //
    // var geocoder = new window.google.maps.Geocoder();
    // var address = this.state.streetAddress + ", " + this.state.city + ", " + this.state.state + " " + this.state.zipcode;
    //
    // alert("geocod");
    // const facilities = [];
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //   if (status == window.google.maps.GeocoderStatus.OK) {
    //     var lat = results[0].geometry.location.lat();
    //     var long = results[0].geometry.location.lng();
    //     alert(lat);
    //     alert(long);
    //     const backendRequest = "http://localhost:5000/api/"+facility+"/";
    //     axios.get(backendRequest)
    //       .then(response => {
    //         alert(JSON.stringify(response.data));
    //         const f1 = response.data.filter(d => Math.abs(d.attributes.LATITUDE - lat) < 2);
    //         alert("F1: "+ JSON.stringify(f1));
    //
    //         const f2 = f1.filter(d => Math.abs(d.attributes.LONGITUDE - long) < 2);
    //         alert("F2 "+ JSON.stringify(f2));
    //         facilities = f2;
    //       })
    //       .catch(error => {
    //         console.log("ERROR: " + error);
    //         return "error";
    //       });
    //   }
    //   else{
    //     alert("no");
    //   }
    // })
    //
    // alert(JSON.string);
    return this.state.facilities.map(current => {
      return <Facility facility={current} user={user}/>;
    })
  }
  render(){
    return(
      <div className="list-page">
      <div className="list-content">
      <div className="page-title-section">
        <div className="titleContainer">
        <Fade bottom>
        <div className="page-title">
        Facilities Near You
        </div>
        </Fade>

      </div>
      <Fade bottom>
      <div className="select-title-description">
      Showing the <span id="your-address">{stringDict[this.state.facility]}</span> within <span id="your-address">{(Math.round(69 * 100 * this.state.distance/100))}</span> miles.
      </div>
      </Fade>
      </div>

      <div className="facility-list">

        <form className="list-filter" onSubmit={this.onSubmit}>
          <div className="form-group">
          <Fade left>
            <div className="search-title">Filter by distance: </div>
            </Fade>
            <Fade right>
            <input
              name="distance"
              type="text"
              className="form-control"
              value={(Math.round(69 * 100 * this.state.distance/100))}
              onChange={this.onChange}
            />
            </Fade>
          </div>
          <div className="home-button-section">
          <Fade left>
          <div className="home-button-form" onClick={this.handleClick}>Refresh</div>
          </Fade>
          </div>
        </form>
      </div>
      </div>
      <div className="table">
        <table className="table">
          <thread className="thread-light">
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
