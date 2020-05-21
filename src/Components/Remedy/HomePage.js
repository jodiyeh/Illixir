import React, {Component } from 'react';
import Collapsible from 'react-collapsible';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import Geocode from "react-geocode";
import "./Styles/HomePage.css";
import { Multiselect } from 'multiselect-react-dropdown';

class HomePage extends Component{
  constructor(props) {
    super();
    this.state = {
      age: null,
      gender: null,
      selected: [],
      symptoms: [],
      isLoading: true,
      options: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

  }
  componentDidMount() {
    axios.get('/api/remedy/symptoms/')
    .then(response => {
      var options = [];
      response.data.forEach(processData);
      function processData(value){
        options.push({
          name: value.Name,
          id: value.ID,
        });
      }
      this.setState({
        options: options,
      })
    })
    .catch( function (error) {
      alert(error);
    })
  }
  goToProducts = e => {
    e.preventDefault();
    window.location.href = "/customremedies/products";
  };
  goToConditions = e => {
    e.preventDefault();
    window.location.href = "/customremedies/conditions";
  };
  handleGenderChange = (event) => {
    this.setState({gender: event.target.value});
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect(selectedList, selectedItem) {
    this.setState({
      symptoms: this.state.symptoms.concat([JSON.stringify(selectedItem.id)])
    })
  }

  onRemove(selectedList, removedItem) {
    var array = this.state.symptoms;
    var index = array.indexOf(removedItem.id.toString());
    alert(JSON.stringify(index))
    array.splice(index, 1);
    this.setState({symptoms: array});
  }

  onSubmit(){
    var symptomString = this.state.symptoms.join("-")
    alert(symptomString)
    window.location = "/customremedies/conditions?symptoms="+symptomString+"&age="+this.state.age+"&gender="+this.state.gender

  }


    render(){
    const { selected, isLoading } = this.state;
    return(
      <div className = "sidebar-page">
        <div className="home-content">
          <div className="home-title-section">
            <div className="titleContainer">
              <div className="home-title">
                Illixir - Custom Remedies
              </div>
              <div className="home-title-description">Welcome! Fill out the form below to find remedies for your symptoms!</div>
            </div>
          </div>
        </div>
        <div className="remedy-content">
          <div className="home-title-section">
            <div className="home-steps-title">Enter Details</div>
          </div>
          <div className="remedy-form">
          <form className="home-search">
            <div className="form-group">
              <div className="search-title">Year of birth: </div>
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
              {this.state.symptoms.join(", ")}
            </div>
            <div className="home-button-section">
            <div className="home-button-form" onClick={this.onSubmit}>Search</div>
            </div>
          </form>
          </div>
        </div>
        <div className="home-button-form" onClick={this.goToProducts}>Go To Products</div>
        <div className="home-button-form" onClick={this.goToConditions}>Go To Conditions</div>
      </div>
    )
  }
}

export default HomePage
