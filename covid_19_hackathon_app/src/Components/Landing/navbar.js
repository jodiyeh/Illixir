import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

class Navbar extends Component {
  render() {
    return (
      <Nav
        activeKey="/dashboard"
      >
        <Nav.Item>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/infopage">Info</Nav.Link>
        </Nav.Item>
      </Nav>

    );
  }
}

export default Navbar;
