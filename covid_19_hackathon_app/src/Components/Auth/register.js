import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.autocomplete = null;
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    this.state = {
      username: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      password: "",
      confirm: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
      window.location = '/login';
    }
  }


  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.errors){
      return true;
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
      window.location = '/login';
    }
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace()
    let address = addressObject.address_components
    var results = [];
    var city = "locality";
    var state = "administrative_area_level_1";
    var zip = "postal_code";

    for (var i=0 ; i < address.length ; i++) {
      if (address[i].types[0] == city) {
        results.push(address[i].long_name);
      }
      else if (address[i].types[0] == state) {
        results.push(address[i].short_name);
      }
      else if (address[i].types[0] == zip) {
        results.push(address[i].long_name);
      }
    }
    this.setState({
      streetAddress: `${address[0].long_name} ${address[1].long_name}`,
      city: results[0],
      state: results[1],
      zipcode: results[2],
    })
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      password: this.state.password,
      confirm: this.state.confirm
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username">Name</label>
                <span className="red-text">{errors.username}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="form-group">
                <input id="autocomplete" className="input-field" ref="input" type="text"/>
                <div className="search-title">street address: </div>
                <input
                  name="streetAddress"
                  type="text"
                  className="form-control"
                  value={this.state.streetAddress}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <div className="search-title">city: </div>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  value={this.state.city}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <div className="search-title">state: </div>
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  value={this.state.state}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <div className="search-title">zipcode: </div>
                <input
                  name="zipcode"
                  type="text"
                  className="form-control"
                  value={this.state.zipcode}
                  onChange={this.onChange}
                />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.confirm}
                  error={errors.confirm}
                  id="confirm"
                  type="password"
                  className={classnames("", {
                    invalid: errors.confirm
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.confirm}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
