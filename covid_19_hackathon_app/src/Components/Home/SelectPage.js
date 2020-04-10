import React, {Component } from 'react';
import { Link } from 'react-router-dom';

class SelectPage extends Component{
  constructor(props) {
    super();
    this.state = {
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      zipcode: "",
      streetAddress: "",
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
    })
  }

  handleClick(string) {
    window.location = "/facility?facility="+string+"&state="+this.state.state+"&city="+this.state.city+"&streetAddress="+this.state.streetAddress+"&zipcode="+this.state.zipcode
  }

  render(){
    return(
      <div className="sidebar-page">
        <div className="select-content">
          <h1 className="select-title">#category!</h1>
          <div className="select-address">{this.state.streetAddress} {this.state.city} {this.state.state} {this.state.zipcode}</div>
          <div className="select-subtitle">facilities</div>
        </div>
        <div class="cards-list">
          <div class="card 1">
            <div class="card_image" onClick={this.handleClick.bind(this, "hospitals")}> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>hospitals</p>
            </div>
          </div>
          <div class="card 2">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>pharmacies</p>
            </div>
          </div>
          <div class="card 3">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>emergency medical services stations</p>
            </div>
          </div>
          <div class="card 4">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>urgent care facilities</p>
            </div>
          </div>
          <div class="card 5">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>veterans health administrations</p>
            </div>
          </div>
          <div class="card 6">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>national shelter systems facilities</p>
            </div>
          </div>
          <div class="card 7">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>local emergency operations</p>
            </div>
          </div>
          <div class="card 8">
            <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
            <div class="card_title title-white">
              <p>fire stations</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectPage
