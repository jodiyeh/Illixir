import React, {Component } from 'react';

class FAQPage extends Component{
    render(){
        return(
            <div className = "FAQ-page">
              <div className = "Title-content">
                <h1 className = "title">#FAQs</h1>
              </div>
              <div className = "FAQ-content">
                <h1 className = "FAQ1">What is the purpose of this website?</h1>
                <div className = "Answer1">This website allows users to discover hospitals, pharmacies, emergency medical centers, and more during the COVID-19 pandemic. The website provides accurate and useful information regarding these health facilities.</div>
                <h1 className = "FAQ2">How do I use this website after logging in?</h1>
                <div className = "Answer2">You must first enter you current location's address on the home screen and then you will be given the option to select from a variety of different health-related centers and facilities. After selecting a facility, you will be shown a list of closeby facilities and additional information will be provided upon clicking on a facility's icon.</div>
                <h1 className = "FAQ3">What kind of information regarding the health facilities are provided?</h1>
                <div className = "Answer3">This website will provide you with </div>
                
              </div>
  
            </div>
          
        )
    }
    }

    export default FAQPage;