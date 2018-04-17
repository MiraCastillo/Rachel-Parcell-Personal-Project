import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import axios from "axios";
import "./Cart.css";
import {Link} from "react-router-dom";
import Checkout from "./../Checkout/Checkout";
import {connect} from "react-redux";
import {updateQuantity} from "./../../reducer";
import swal from "sweetalert2";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      information: [],
      amount: 0,
      prices: [],
      quantity: 0
    };
  }

  handleClick(){
    this.props.updateQuantity(this.state.quantity)
    axios.post("/api/newQuantity", {quantity: this.state.quantity, orderId: this.props.orderId
      // , productId:
    })
  }

  handleNewQuantity(e){
    this.setState({quantity: e})
  }

  deleteItem(id) {
    axios.delete("/api/deleteItem", id);
  }

  componentDidMount() {
    axios.post("/api/getCart", {userId: this.props.userId, orderId: this.props.orderId}).then(info => {
      this.setState({ information: info.data });
    }).catch(err => {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'You need to be signed in to view this page!',
      })
    });
  }

  render() {
    var allTotals = []
    var cartInfo = this.state.information.map(product => {
      var productTotal = product.price * product.quantity
      allTotals.push(productTotal)
      this.state.prices.push(product.price);
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
                <button onClick={() => this.handleClick()} className="up-quantity">Update</button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="label">Total:</div>
            <div className="item-total">${productTotal}.00</div>
          </div>
          <button onClick={() => this.deleteItem(product.id)} className="delete-item">
            Delete
          </button>
        </div>
      );
    });
    var amount = allTotals.reduce((total, val) => {
      return total+val
    }, 0);
    axios.post("/api/updateTotal", {total: amount})
    var amountInPennies = amount*100
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
              <div className="cart-total">${amount}.00</div>
            </div>
            <Checkout amount={+amountInPennies}/>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  var {orderId, userId} = state;
  return{
    orderId,
    userId
  }
}

export default connect(mapStateToProps, {updateQuantity})(Cart)