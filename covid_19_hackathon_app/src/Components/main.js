import React from 'react';
import {Switch, ROute} from 'react-router-dom'
import LandingPage from './landingpage';
const Main= () =>{
    <Switch>
        <Route exact path = "/" component ={LandingPage} />

    </Switch>
}