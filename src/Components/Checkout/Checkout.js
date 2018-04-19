import React, {Component} from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import {updateProductsToDisplay, updateOrderId} from "./../../reducer"

class Checkout extends Component{
  onToken = (token) => {
    token.card = void 0
    axios.post('/api/payment', {token, amount: this.props.amount}).then(res => {
      console.log("We did it!", res.data[0].orderId)
      this.props.updateOrderId(res.data[0].orderId)
      this.props.updateProductsToDisplay(res.data[1])
      this.props.updateCart()
    })
  }


  render(){
    return(
      <StripeCheckout 
      name="Rachel Parcell"
      description="collection"
      image="./../../logo.jpg"
      token= {this.onToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      amount={this.props.amount}
      />
    )
  }
}

function mapStateToProps(state) {

  return{

  }
}


export default connect(mapStateToProps, {updateProductsToDisplay, updateOrderId})(Checkout)