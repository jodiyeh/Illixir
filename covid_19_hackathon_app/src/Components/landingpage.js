import React, {Component } from 'react';
import {Grid, Cell} from 'react-mdl';

class Landing extends Component{
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
                    <p1>
                    <input type="text" placeholder = "Your Address: " style={{width: "400px"}} s/>
                    </p1>

                    <p2> 
                        <button>Submit</button>
                    </p2>
                    </form>
                    
                </div>
                
            </Grid>
        </div>
    )
    }   
}

export default Landing