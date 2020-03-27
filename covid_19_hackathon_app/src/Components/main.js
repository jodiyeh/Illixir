import React from 'react';
import {Switch, Route} from 'react-router-dom'
import LandingPage from './landingpage';
import InfoPage from './infopage';

const Main= () =>(
    <Switch>
        <Route exact path = "/" component = {InfoPage} />
    </Switch>
)

export default Main;
