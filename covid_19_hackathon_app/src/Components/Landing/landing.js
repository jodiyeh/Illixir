import React, { Component } from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="col">
          <div className="col s12 center-align">
            <h4>
              <b>COVID-19 Facilities Finder</b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
            An application to match you to nearby hospitals, pharmacies, shelters, emergency medical centers, and more!
            </p>
            <br />
            <div className="row">
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign Up
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable pink accent-3"
              >
                Log In
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Landing;
