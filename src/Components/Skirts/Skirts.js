import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import "./Skirts.css";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Skirts extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get("/api/getSkirts").then(products => {
      this.setState({ products: products.data });
    });
  }

  render() {
    const info = this.state.products.map(product => {
      return (
        <Link to={`/product/${product.id}`}
        className="product-container">
          <img className="product-image" src={product.picture} />
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}.00</div>
        </Link>
      );
    });
    return (
      <div>
        <Nav />
        <div className="all-products">
        {info}
        </div>
      </div>
    );
  }
}
