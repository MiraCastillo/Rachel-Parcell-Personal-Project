import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import axios from "axios";
import "./Cart.css";
import {Link} from "react-router-dom";
import Checkout from "./../Checkout/Checkout";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      information: [],
      amount: 0,
      prices: [],
      quantity: 0
    };
  }

  handleNewQuantity(e){
    this.setState({quantity: e})
  }

  deleteItem(id) {
    axios.delete("/api/deleteItem", id);
  }

  componentDidMount() {
    axios.get("/api/getCart").then(info => {
      this.setState({ information: info.data });
    });
  }

  render() {
    var cartInfo = this.state.information.map(product => {
      this.state.prices.push(product.price);
      // this.setState({quantity: product.quantity});
      return (
        <div className="cart-item">
          <Link to={`/product/${product.id}`} >
            <div className="cart-name">{product.name}</div>
          </Link>
          <Link to={`/product/${product.id}`} >         
            <img className="cart-picture" src={product.picture} />
            </Link>
          <div className="container">
            <div className="label">Price:</div>
            <div className="cart-price">${product.price}.00</div>
          </div>
          <div className="container">
            <div className="label">Quantity:</div>
            <div className="cart-quantity">{product.quantity}</div>
          </div>
          <div className="container">
            <div className="update-title">
              <div className="label">Update Quantity:</div>
              <div className="update-input-and-button">
                <input onChange={(e)=>this.handleNewQuantity(e.target.value)}className="update-quantity" placeholder="#" />
                <button className="up-quantity">Update</button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="label">Total:</div>
            <div className="item-total">${product.total}.00</div>
          </div>
          <button onClick={() => this.deleteItem(product.id)} className="delete-item">
            Delete
          </button>
        </div>
      );
    });
    return (
      <div>
        <Nav />
        <div className="cart">
          <div className="cart-items">{cartInfo}</div>
          <div className="cart-checkout">
            <div className="total-container">
              {/* <div className="total-label">Tax:</div>
              <div className="cart-tax">$.00</div> */}
            </div>
            <div className="total-container">
              <div className="total-label">Cart Total:</div>
              <div className="cart-total">${this.state.amount}.00</div>
            </div>
            <Checkout amount={+this.state.amount}/>
          </div>
        </div>
      </div>
    );
  }
}
