import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import {} from "material-design-icons";

export default function Nav() {
  return (
    <div className="nav-bar">
      <div className="login">
      <a href="http://localhost:3000/#/login">Login</a>
      </div>
      <a href="http://localhost:3000/#/">
        <div className="brand">
          <div className="rachel">RACHEL PARCELL</div>
          <div className="collection">collection</div>
        </div>
      </a>
      <div className="cart-container">
        <a href="http://localhost:3000/#/cart" className="cart-word">
          Cart
        </a>
      </div>
    </div>
  );
}
