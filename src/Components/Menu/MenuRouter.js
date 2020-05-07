import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import AppBar from '@material-ui/core/AppBar';
import { connect } from "react-redux";
import Toolbar from '@material-ui/core/Toolbar';
import "./MainMenuPage.css";
import { faShieldVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Switch, useLocation} from "react-router-dom";
import HomePage from '../Home/HomePage';
import FAQPage from '../Home/FAQPage';
import SelectPage from '../Home/SelectPage';
import FacilityPage from '../Home/FacilityPage';
import SideBar from '../Home/SideBar';
import MainMenuPage from './MainMenuPage';
import AboutPage from '../Home/AboutPage';
import UpdateAddress from '../Home/UpdateAddressPage';
import FacilityList from '../Home/FacilityListPage';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";


class MenuRouter extends Component{

    constructor(props) {
         super();
        this.state = {
              username: "",
              streetAddress: "",
              city: "",
              state: "",
              zipcode: "",
              latidude: 0,
              longitude: 0,
        };
    }

     goToFacilityFinder= e =>{
        e.preventDefault();
        window.location.href = "/facilityfinder/home";
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = "../login";
      };



    render(){
        return(



        <Switch className="switch">
          <Route path="/mainmenupage" render = {() => (<MainMenuPage id={this.props.auth.user.id}/>)}/>
          <Route path="/facilityfinder" render = {() => (<SideBar id={this.props.auth.user.id}/>)}/>

        </Switch>



        )
    }
}

MenuRouter.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(MenuRouter);
