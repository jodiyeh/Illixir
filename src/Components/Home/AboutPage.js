import React, {Component } from 'react';
import Fade from 'react-reveal/Fade';

class AboutPage extends Component{

  render(){
    return(
      <div className="sidebar-page">
      <div className="page-title-section">
        <div className="titleContainer">
        <Fade bottom>
        <div className="page-title">
About Illixir
</div>
</Fade>
</div>
</div>
        <div className="about-content">
          <Fade left>
          <div className="about-title">Our Mission</div>
          </Fade>
          <Fade left>
          <div className="about-description">To provide a means to effectively utilize the data in public databases.</div>
          </Fade>
          <Fade right>
          <div className="about-title">Description</div>
          </Fade>
          <Fade right>
          <div className="about-description">Illixir is an app developed by two college students passionate about social good that aims to provide a singular platform where users can find various forms of aid in this period of the Covid-19 pandemic. Starting out as a hackathon project in late March of 2020, this application has been continually developed to incorporate more and more features to enhance its utility. The platform’s core technology uses basic but useful searching/filtering algorithms to allow users to be matched with nearby facilities.</div>
          </Fade>
          <Fade left>
          <div className="about-title">Developers</div>
          </Fade>
          <Fade left>
          <div className="about-description">Lorne Zhang: Computer Science, Duke University '22</div>
          </Fade>
          <Fade left>
          <div className="about-description">Brian Li: Computer Science, Duke University '22</div>
          </Fade>
        </div>
      </div>
    )
  }
}

export default AboutPage;
