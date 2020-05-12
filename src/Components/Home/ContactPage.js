import React, {Component } from 'react';
import Fade from 'react-reveal/Fade';

class ContactPage extends Component{
    render(){
        return(
        <div className="sidebar-page">
          <div className="page-title-section">
            <div className="titleContainer">
            <Fade bottom>
            <div className="page-title">
              Contact Us
            </div>
            </Fade>
            </div>
          </div>
          <div className="about-content">
              <Fade left>
              <div className="about-title">Lorne Zhang</div>
              </Fade>
              <Fade left>
              <div className="about-description">Email: lorne.zhang@duke.edu</div>
              </Fade>
              <Fade right>
              <div className="about-description">LinkedIn: https://www.linkedin.com/in/lorne-zhang-589195146/</div>
              </Fade>
              <Fade left>
              <div className="about-title">Brian Li</div>
              </Fade>
              <Fade left>
              <div className="about-description">Email: bl195@duke.edu</div>
              </Fade>
              <Fade right>
              <div className="about-description">LinkedIn: https://www.linkedin.com/in/brianli314/</div>
              </Fade>
            </div>

          </div>
        )
    }
}

export default ContactPage;
