import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';
import {useHistory} from 'react-router-dom';

class Home extends Component{
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      address: "",
    };
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    window.location = '/dashboard/infopage';
  };
    render(){
    return(
        <div style = {{width: '100%'}}>
            <Grid className="landing-grid">
                <Cell col={12}>
                    <img
                    src="https://cdn2.iconfinder.com/data/icons/medical-v1-0-outline/32/Hospital-512.png"
                    alt="hospital"
                    className = "hosp-img"
                    />
                </Cell>

                <div className = "Title">
                    <h1>COVID-19 Facilities Finder</h1>
                </div>

                <div className = "Description">
                    <h1>Please enter your current address in the textfield below to be matched to nearby hospitals, pharmacies, shelters, emergency medical centers, and more!</h1>
                </div>

                <div className = "inputbox">
                <form>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.address}
                    id="address"

                  />
                  <label htmlFor="address">Address</label>
                </div>
                    <p2>
                        <button onClick={this.onSubmit}>Search</button>
                    </p2>
                    </form>

                </div>

            </Grid>
        </div>
    )
    }
}

export default Home
