import React, {Component} from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export default class Checkout extends Component{
  onToken = (token) => {
    token.card = void 0
    axios.post('/api/payment', {token, amount: this.props.amount}).then(res => {
      console.log("We did it!")
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
