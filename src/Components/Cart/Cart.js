import React, { Component } from "react";
import Nav from "./../Nav/Nav";
import axios from "axios";
import "./Cart.css";
import {Link} from "react-router-dom";
import Checkout from "./../Checkout/Checkout";
import {connect} from "react-redux";
import {updateQuantity, updateProductsToDisplay} from "./../../reducer";
import swal from "sweetalert2";
import Footer from "./../Footer/Footer";


class Cart extends Component {
  constructor() {
    super();
    this.state = {
      information: [],
      amount: 0,
      prices: [],
      quantity: 0
    };
    this.displayItems = this.displayItems.bind(this)
  }


  handleClick(id){
    this.props.updateQuantity(this.state.quantity)
    axios.post("/api/newQuantity", {quantity: this.state.quantity, orderId: this.props.orderId, productId: id}).then(resp => {
      this.displayItems()
    })
  }

  handleNewQuantity(e){
    this.setState({quantity: e})
  }

  deleteItem(id) {
    axios.delete(`/api/deleteItem/${id}`).then(res => {
      console.log(res)
      this.props.updateProductsToDisplay(res.data)
  })
}

displayItems(){
  axios.post("/api/getCart", {userId: this.props.userId, orderId: this.props.orderId}).then(info => {
    this.props.updateProductsToDisplay(info.data)
      this.setState({ information: info.data });
    })
  }

  componentWillReceiveProps(props) {
    if(this.props.orderId === 0){
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'You need to be signed in to view this page!',
      })
    }
  }

  componentDidMount() {
    console.log(this.props.orderId)
    this.displayItems()
  }

  render() {
    var allTotals = []
    var cartInfo = this.props.productsToDisplay.map((product, i) => {
      if(product) {
      var productTotal = product.price * product.quantity
      allTotals.push(productTotal)
      this.state.prices.push(product.price);
      return (
        <div key={i} className="cart-item">
          <Link to={`/product/${product.id}`} className="cart-name" >
            <div>{product.name}</div>
          </Link>
          <Link to={`/product/${product.id}`} className="cart-picture" >         
            <img src={product.picture}  className="cart-picture" />
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
                <button key={product.id} onClick={() => this.handleClick(product.id)} className="up-quantity" >Update</button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="label">Total:</div>
            <div className="item-total">${productTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}.00</div>
          </div>
          <button className="deleteItem" onClick={() => this.deleteItem(product.id)}>
            Delete
          </button>
        </div>
      );
    } else {
      return(
        <div>Your cart is empty!</div>
      )
    }
    });
    var amount = allTotals.reduce((total, val) => {
      return total+val
    }, 0);
    axios.post("/api/updateTotal", {total: amount})
    var amountInPennies = amount*100
    return (
      <div className="allTheThings">
        <Nav />
        <div className="cart">
          <div className="cart-items">{cartInfo}</div>
          <div className="cart-checkout">
            {/* <div className="total-container">
              <div className="total-label">Tax:</div>
              <div className="cart-tax">$.00</div>
            </div> */}
            <div className="total-container">
              <div className="total-label">Cart Total:</div>
              <div className="cart-total">${amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}.00</div>
            </div>
            <Checkout updateCart={this.displayItems} amount={+amountInPennies}/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


function mapStateToProps(state) {
  var {orderId, userId, productsToDisplay} = state;
  return{
    orderId,
    userId,
    productsToDisplay
  }
}

export default connect(mapStateToProps, {updateQuantity, updateProductsToDisplay})(Cart)