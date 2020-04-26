import React, {Component } from 'react';

class AboutPage extends Component{

  render(){
    return(
      <div className="sidebar-page">
      <div className="page-title-section">
        <div className="titleContainer">
        <div className="page-title">
About Illixir
</div>
</div>
</div>
        <div className="about-content">

          <div className="about-title">Our Mission</div>
          <div className="about-description">To provide a means to effectively utilize the data in public databases.</div>
          <div className="about-title">Description</div>
          <div className="about-description">Covid19 is an app developed by two college students that aims to provide a singular platform where users can find various forms of aid in this period of the Covid-19 pandemic. Starting out as a hackathon project in late March, this application has been continually developed to incorporate more and more features to enhance its utility. The platform’s core technology is basic but useful search filtering algorithms to allow for users to be matched with nearby facilities.</div>
          <div className="about-title">Contributers</div>
          <div className="about-description">Lorne Z: Computer Science, Duke University '22</div>
          <div className="about-description">Brian L: Computer Science, Duke University '22</div>
        </div>
      </div>
    )
  }
}

export default AboutPage;
