import React, { Component } from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import "../Auth/Auth.css"
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing">
      <div class="bg5"></div>
      <div class="bg5 bg2"></div>
      <div class="bg5 bg3"></div>
      <div className="content3">
          <div className="col s12">
            <h2>
            <FontAwesomeIcon size="1x" color="black" icon={faShieldVirus}/>
            &nbsp;Illixir
            </h2>
            <p className="flow-text grey-text text-darken-1">
            An application to match you to nearby medical facilities and provide personalized home remedies!
            </p>
            <br />
            <div className="col">
            <div className="col s6">
              <a href="/register"><button
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
              </button></a>
            </div>

            <div className="col s6">
              <a href="/login"><button
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button></a>
            </div>
            </div>
        </div>
      </div>
</div>
    );
  }
}

export default LandingPage;
