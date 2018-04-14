import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"

export default class SignUp extends Component {
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
      .then(res => {
        this.props.history.push("/");
      });
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
          <Link to="/">
            <button onClick={() => this.signUp()}>Sign up</button>
          </Link>
        </div>
      </div>
    );
  }
}
