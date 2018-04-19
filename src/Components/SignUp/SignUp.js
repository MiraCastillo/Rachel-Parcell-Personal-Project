import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"
import swal from "sweetalert2";
import {connect} from "react-redux";
import {updateUserId, updateUsername, updateUserName, updateOrderId, updateProducts, updateTotal, updateLoggedInStatus, updateQuantity} from "./../../reducer"

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      password: ""
    };
  }

  handleName(e) {
    this.setState({ name: e });
  }

  handleNewUser(e) {
    this.setState({ username: e });
  }

  handleNewPass(e) {
    this.setState({ password: e });
  }

  signUp() {
    axios
      .post("/api/newUser", {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
      .then(user => {
        if(!user[0]){
          swal({
            type: "error",
            title: "Oops...",
            text: "Looks like that username password combination is taken. Try another one!",
            background: '#FDF0F0'
          });
        } else {
        console.log(user)
        this.props.history.push("/");
        this.props.history.push("/");
          axios.post("/api/allUserInfo", {username: this.state.username, password: this.state.password}).then(res => {
            console.log("I'm running", res);
            var {updateUserId, updateUsername, updateUserName, updateOrderId, updateProducts, updateTotal, updateLoggedInStatus, updateQuantity} = this.props;
            if(res.data[2][0]){
              var {total, quantity} = res.data[2][0];
              updateTotal(total);
              updateQuantity(quantity);
              updateProducts(res.data[2]);
              // console.log(res.data[2])
            }
            var {username, name} = res.data[0]
            console.log(res.data[0])
            var {loggedIn, orderId, id} = res.data[1]
            console.log(res.data[1])
            updateUserId(id);
            updateUsername(username);
            updateUserName(name);
            updateOrderId(orderId);
            updateLoggedInStatus(loggedIn);
          })
      }
      })
    }

  render() {
    return (
      <div className="sign-up-page">
        <div className="sign-up-container">
          <div className="sign-up">Sign Up!</div>
          <input className="i-su"
            onChange={e => this.handleName(e.target.value)}
            placeholder="Name"
          />
          <input className="i-su"
            onChange={e => this.handleNewUser(e.target.value)}
            placeholder="Username"
          />
          <input className="i-su"
            onChange={e => this.handleNewPass(e.target.value)}
            placeholder="Password"
          />
            <button onClick={() => this.signUp()}>Sign up</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
  }
}
export default connect (mapStateToProps, {updateUserId, updateUsername, updateUserName, updateOrderId, updateProducts, updateTotal, updateLoggedInStatus, updateQuantity})(SignUp)
