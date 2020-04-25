import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import { google } from 'google-maps';
import './Styles/SelectPage.css';

class SelectPage extends Component{
  constructor(props) {
    super();
    this.state = {
      city: "",
      state: "",
      zipcode: "",
      streetAddress: "",
      latitude: "",
      longitude: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);

    this.setState({
      state: params.get("state"),
      city: params.get("city"),
      zipcode: params.get("zipcode"),
      streetAddress: params.get("streetAddress"),
      latitude: params.get("latitude"),
      longitude: params.get("longitude")
    })
  }
  handleClick(string) {


      window.location = "/facility?facility="+string
        +"&state="+this.state.state
        +"&city="+this.state.city
        +"&streetAddress="+this.state.streetAddress
        +"&zipcode="+this.state.zipcode
        +"&latitude="+this.state.latitude
        +"&longitude="+this.state.longitude
        +"&distance=.36"

  }

  styleObj = {
    fontSize: 14,
    color: "#000000",
    fontWeight: 100,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    margin: 10,
    opacity: 0.8,
    borderRadius: 10,
}

styleObj2 = {
  fontSize: 14,
  color: "#000000",
  fontWeight: 100,
  textAlign: "center",
  backgroundColor: "#FFFFFF",
  margin: 2,
  opacity: 0.8,
  borderRadius: 10,
}

  render(){
    return(
      <div className="sidebar-page">
        <div className="select-content">
          <div className="select-title-container">
            <div className="select-title">Choose An Industry</div>
          </div>
          <div className="select-title-description">
            <div className="select-address">Your inputted search address is {this.state.streetAddress}, {this.state.city}, {this.state.state}, {this.state.zipcode}!</div>
            <div className="select-subtitle">Here is a list of facilities</div>
          </div>
          <div className="select-cards">
          <div class="cards-list">
            <div class="card 1">
              <div class="card_image" onClick={this.handleClick.bind(this, "hospitals")}> <img src= {process.env.PUBLIC_URL + "resources/hospital.jpg"} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}>
                  Hospitals
                  </p>
              </div>
            </div>
            <div class="card 2">
              <div class="card_image" onClick={this.handleClick.bind(this, "nursingHomes")}> <img src={process.env.PUBLIC_URL + "resources/pharmacy.jpg"} /> </div>
              <div class="card_title title-white">
              <p style = {this.styleObj}>
                  Nursing Homes
                  </p>
              </div>
            </div>
            <div class="card 3">
              <div class="card_image" onClick={this.handleClick.bind(this, "emergencyServices")}> <img src={process.env.PUBLIC_URL + "resources/ems-station.jpg"} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj2}> Emergency Medical Services Stations</p>
              </div>
            </div>
            <div class="card 4">
              <div class="card_image" onClick={this.handleClick.bind(this, "urgentCare")}> <img src={process.env.PUBLIC_URL + "resources/urgentcare.jpg"} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}>Urgent Care Facilities</p>
              </div>
            </div>
            <div class="card 5">
              <div class="card_image" onClick={this.handleClick.bind(this, "veteranHealth")}> <img src={process.env.PUBLIC_URL + "resources/veteranhealth.jpg"} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}> Veterans Health Administrations</p>
              </div>
            </div>
            <div class="card 7">
              <div class="card_image" onClick={this.handleClick.bind(this, "emergencyOps")}> <img src={process.env.PUBLIC_URL + "resources/localemerg.jpg"} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}>Local Emergency Operations</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SelectPage
