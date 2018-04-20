import "./Login.css";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import {connect} from "react-redux";
import {updateUserId, updateUsername, updateUserName, updateOrderId, updateProducts, updateTotal, updateLoggedInStatus, updateQuantity} from "./../../reducer"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsername(e) {
    console.log(e)
    this.setState({ username: e });
  }

  handlePassword(e) {
    console.log(e)
    this.setState({ password: e });
  }

  handleLogin() {
    axios
      .post("/api/loginUser", {
        username: this.state.username,
        password: this.state.password
      })
      .then(user => {
        if (user.status === 200) {
          console.log(user.data[0])
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
        } else {
          swal({
            type: "error",
            title: "Oops...",
            text: "Looks like you have the wrong username or password",
            background: '#FDF0F0'
          });
        }
      });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
        <div className="login-p">Login!</div>
          <input className="i-l"
            onChange={e => this.handleUsername(e.target.value)}
            placeholder="Username"
          />
          <input type="password" className="i-l"
            onChange={e => this.handlePassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={() => this.handleLogin()}>Login!</button>
          <div className="not-member">
            <div className="q">Not a member?</div>
            <Link to="/signUp" className="s">Sign up</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
  }
}

export default connect(mapStateToProps, {updateUserId, updateUsername, updateUserName, updateOrderId, updateProducts, updateTotal, updateLoggedInStatus, updateQuantity})(Login)
