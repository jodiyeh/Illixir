import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import { google } from 'google-maps';
import './Styles/SelectPage.css';
import { faClinicMedical, faHandHoldingMedical, faProcedures, faAmbulance, faUserNurse, faHospital} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="page-title-section">
          <div className="titleContainer">
          <div className="page-title">
          Choose A Category
          </div>

        </div>
        </div>
        <div className="select-title-description">
        Your address is currently set as <span id="your-address">{this.state.streetAddress}</span>, <span id="your-address">{this.state.city}</span>, <span id="your-address">{this.state.state}</span>, <span id="your-address">{this.state.zipcode}</span>. Choose
        a facility from the options below.
        </div>
          <div className="select-cards">
          <div class="cards-list">
            <div class="card 1">
              <div class="card_image" onClick={this.handleClick.bind(this, "hospitals")}> <FontAwesomeIcon size="6x" color="#F78888" icon={faHospital} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}>
                  Hospitals
                  </p>
              </div>
            </div>
            <div class="card1 2">
              <div class="card_image" onClick={this.handleClick.bind(this, "nursingHomes")}> <FontAwesomeIcon size="6x" color="#77A6F7" icon={faUserNurse} /></div>
              <div class="card_title1 title-white">
              <p style = {this.styleObj}>
                  Nursing Homes
                  </p>
              </div>
            </div>
            <div class="card2 3">
              <div class="card_image" onClick={this.handleClick.bind(this, "emergencyServices")}>  <FontAwesomeIcon size="6x" color="#F3D250" icon={faAmbulance} /></div>
              <div class="card_title2 title-white">
                <p style = {this.styleObj2}> Emergency Medical Services Stations</p>
              </div>
            </div>
            <div class="card 4">
              <div class="card_image" onClick={this.handleClick.bind(this, "urgentCare")}><FontAwesomeIcon size="6x" color="#F78888" icon={faProcedures} /> </div>
              <div class="card_title title-white">
                <p style = {this.styleObj}>Urgent Care Facilities</p>
              </div>
            </div>
            <div class="card1 5">
              <div class="card_image" onClick={this.handleClick.bind(this, "veteranHealth")}> <FontAwesomeIcon size="6x" color="#77A6F7" icon={faClinicMedical} /> </div>
              <div class="card_title1 title-white">
                <p style = {this.styleObj}> Veterans Health Administrations</p>
              </div>
            </div>
            <div class="card2 7">
              <div class="card_image" onClick={this.handleClick.bind(this, "emergencyOps")}> <FontAwesomeIcon size="6x" color="#F3D250" icon={faHandHoldingMedical} />
</div>
              <div class="card_title2 title-white">
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
