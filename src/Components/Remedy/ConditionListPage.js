import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { google } from 'google-maps';
import Geocode from "react-geocode";
import { faMapMarkedAlt, faHouseUser, faMapMarkerAlt, faHospitalAlt, faRoute, faInfoCircle, faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from 'react-reveal/Fade';
import "./Styles/ConditionsListPage.css";
import { Multiselect } from 'multiselect-react-dropdown';

const Condition = props => (
  <Fade bottom>
  <tr className='condition-card' style={{ fontSize: "1.7vh" }}>
    <td>{props.condition.Issue.Name}</td>
    <a href={"https://google.com/search?q=" + props.condition.Issue.Name}  target="_blank">Google Search</a>
    <td>Match: {props.condition.Issue.Accuracy}%</td>
  </tr>
  </Fade>
)
class ConditionListPage extends Component{
  constructor(props) {
    super();
    this.state = {
      age: null,
      gender: null,
      symptoms: [],
      conditions: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);

  }
  handleGenderChange = (event) => {
    this.setState({gender: event.target.value});
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect(selectedList, selectedItem) {
    this.setState({
      symptoms: this.state.symptoms.concat([JSON.stringify(selectedItem.name)])
    })
  }
  componentDidMount(){
    const params = new URLSearchParams(this.props.location.search);
    this.setState({
      symptoms: params.get("symptoms"),
      age: params.get("age"),
      gender: params.get("gender"),
    })
    var symptoms = params.get("symptoms");
    var symptomsList = symptoms.split("-");
    var ele;
    for(ele in symptomsList){
      axios.get('/api/remedy/diagnosis/', {
        params: {
          symptoms: symptomsList[ele],
          year_of_birth: params.get("age"),
          gender: params.get("gender"),
        }
      })
      .then( response => {
        alert(JSON.stringify(response.data));
        this.setState({
          conditions: new Set(this.state.conditions.concat(response.data))
        })
      })
    }

  }
  conditionsList() {
    return this.state.conditions.map(current => {
      return <Condition condition={current}/>;
    })
  }

    render(){
    return(
      <div className = "Remedy-Home">
      <div className="home-content">
        <div className="home-title-section">
          <div className="titleContainer">
            <div className="home-title">
              Conditions
            </div>
          </div>
        </div>
      </div>

          <div className="remedy-content">
          <div className="home-title-section">
            <div className="home-steps-title">Here are some possible conditions.</div>
          </div>
            <div className="remedy-conditions">
            <div className="table">

              <table className="table">
                <thread className="thread-light">
                </thread>
                <tbody>
                  { this.conditionsList() }
                </tbody>
              </table>
            </div>
            </div>

          </div>
          <div className="remedy-content">
            <div className="home-title-section">
              <div className="home-steps-title">Fill Out This Form</div>
            </div>
            <div className="remedy-form">
            <form className="home-search">
              <div className="form-group">
                <div className="search-title">Age: </div>
                <input
                name="age"
                type="text"
                className="form-control"
                value={this.state.age}
                onChange={this.onChange}
                />
              </div>
              {this.state.age}
              <div className="form-group">
                <div className="search-title">Sex: </div>
                <select class="browser-default" onChange={this.handleGenderChange} value={this.state.gender}>
                  <option value="" disabled selected>Select your option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {this.state.gender}
              <div className="form-group">
                <div className="search-title">Symptoms: </div>
                <Multiselect
                  options={this.state.options} // Options to display in the dropdown
                  selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={this.onSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
                {this.state.symptoms}
              </div>
              <div className="home-button-section">
              <div className="home-button-form" onClick={this.onSubmit}>Search</div>
              </div>
            </form>
            </div>
          </div>
      </div>
    )
  }
}

export default ConditionListPage
