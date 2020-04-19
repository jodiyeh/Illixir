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
                <div className = "Answer3">This website will provide you with a list of facilities sorted in order of relative proximity to your current location. The addresses, coordinates, and proximity of each location will be provided.</div>
                <h1 className = "FAQ4">What does the Information Page show?</h1>
                <div className = "Answer4">The Information Page presents a Google Maps view that displays pinpoints of your location as well as various health facilities. You can click on a facility to view additional information.</div>
                <h1 className = "FAQ5">How can I contact the developers if I have a question or issue?</h1>
                <div className = "Answer5">In the contacts page, you can submit an email to the developers and you will have your question resolved within 1-2 business days.</div>
              </div>
  
            </div>
          
        )
    }
    }

    export default FAQPage;