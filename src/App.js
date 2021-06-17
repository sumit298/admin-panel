import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import firebase from "firebase";
import Spinner from "./assets/loader.gif";
import Navigation from "./navigation";
import Login from "./auth/login/LoginRegister";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.authListener();
    setTimeout(
      function () {
        this.setState({
          loading: false,
        });
      }.bind(this),
      1000
    );
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="Spinner">
          <img src={Spinner} alt="Spinner" />
        </div>
      );
    }
    return (
      <div>
        <Switch>
          {/* <Route path={["/login"]} component={Login}></Route> */}
          <div>{this.state.user ? <Navigation /> : <Login />}</div>
          {/* <Navigation /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
