import React, {Component } from 'react';
import Fade from 'react-reveal/Fade';

class FAQPage extends Component{
    render(){
        return(
          <div className="sidebar-page">
          <div className="page-title-section">
            <div className="titleContainer">
            <Fade bottom>
            <div className="page-title">
              Frequently Asked Questions
             </div>
            </Fade>
            </div>
          </div>
            <div className="about-content">
              <Fade left>
              <div className="about-title">What is the purpose of this website?</div>
              </Fade>
              <Fade left>
              <div className="about-description">This website allows users to discover hospitals, pharmacies, emergency medical centers, and more during the COVID-19 pandemic. The website provides accurate and useful information regarding these health facilities.</div>
              </Fade>
              <Fade right>
              <div className="about-title">How do I use this website after logging in?</div>
              </Fade>
              <Fade right>
              <div className="about-description">You must first enter you current location's address on the home screen and then you will be given the option to select from a variety of different health-related centers and facilities. After selecting a facility, you will be shown a list of closeby facilities and additional information will be provided upon clicking on a facility's icon.</div>
              </Fade>
              <Fade left>
              <div className="about-title">What kind of information regarding the health facilities are provided?</div>
              </Fade>
              <Fade left>
              <div className="about-description">This website will provide you with a list of facilities sorted in order of relative proximity to your current location. The addresses, coordinates, and proximity of each location will be provided.</div>
              </Fade>
              <Fade right>
              <div className="about-title">What does the Information Page show?</div>
              </Fade>
              <Fade right>
              <div className="about-description">The Information Page presents a Google Maps view that displays pinpoints of your location as well as various health facilities. You can click on a facility to view additional information.</div>
              </Fade>
              <Fade left>
              <div className="about-title">How can I contact the developers if I have a question or issue?</div>
              </Fade>
              <Fade left>
              <div className="about-description">In the contacts page, you can submit an email to the developers and you will have your question resolved within 1-2 business days.</div>
              </Fade>
            </div>
          </div>


        )
    }
    }

    export default FAQPage;
