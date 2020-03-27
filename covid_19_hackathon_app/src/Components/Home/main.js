import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import HomePage from './homepage';
import InfoPage from './infopage';
import {Layout, Header, Navigation, Drawer,Textfield, Content} from 'react-mdl';
import { Route, Switch } from "react-router-dom";

class Main extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{height: '300px', position: 'relative'}}>
        <Layout fixedHeader fixedDrawer>
          <Header className= "header-color" title="Covid-19 App" scroll>
            <Textfield
              value=""
              onChange={() => {}}
              label="Search"
              expandable
              expandableIcon="search"
            />
          </Header>
          <Drawer title="Title">
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <Navigation>
              <a href="#">Link</a>
              <a href="#">Link</a>
              <a href="#">Link</a>
              <a href="#">Link</a>
            </Navigation>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </Drawer>
          <Switch>
            <Route path = "/home" component ={HomePage} />
            <Route exact path = "/infopage" component = {InfoPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

Main.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Main);
