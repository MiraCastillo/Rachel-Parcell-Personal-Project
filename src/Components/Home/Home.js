import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "./../Footer/Footer";
import LandingImage from "./../LandingImage/LandingImage";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
      <div className="home-page">
        <LandingImage />
        <Nav />
        <div className="bar">
          <div />
          <Link to="/shopping" className="shopping">
            Shop
          </Link>
        </div>
        <div className="specifics-container">
          <Link to="/tops" className="tops">
            <div>Shop tops</div>
          </Link>
          <Link to="/skirts" className="skirts">
            <div>Shop skirts</div>
          </Link>
          <Link to="/dresses" className="dresses">
            <div>Shop dresses</div>
          </Link>
          <Link to="/shopping" className="all">
            <div>Shop all</div>
          </Link>
        </div>

        <Link to="/spring" className="spring">
            <div className="shop-the-season">Shop the season! </div>
        </Link>
      </div>
        <Footer />
      </div>
    );
  }
}
