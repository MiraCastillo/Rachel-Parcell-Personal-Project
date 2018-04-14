import "./Login.css";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsername(e) {
    this.setState({ username: e });
  }

  handlePassword(e) {
    this.setState({ password: e });
  }

  handleLogin() {
    axios
      .post("/api/loginUser", {
        username: this.state.username,
        password: this.state.password
      })
      .then(user => {
        if (user.data[0]) {
          this.props.history.push("/");
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
          <input className="i-l"
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
