import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import {} from "material-design-icons";
import { connect } from "react-redux";

class Nav extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    if (this.props.loggedIn === false) {
      var areYouLoggedIn = "Login";
    } else {
      var areYouLoggedIn = "Logout";
    }
    return (
      <div className="nav-bar">
        <div className="login">
          <a href={process.env.REACT_APP_LOGIN}>{areYouLoggedIn}</a>
        </div>
        <Link to="/">
          <div className="brand">
            <div className="rachel">RACHEL PARCELL</div>
            <div className="collection">collection</div>
          </div>
        </Link>
        <div className="cart-container">
          <Link to="/cart" className="cart-word">
            Cart
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var { loggedIn } = state;
  return {
    loggedIn
  };
}

export default connect(mapStateToProps)(Nav);
