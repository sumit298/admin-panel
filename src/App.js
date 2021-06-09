import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./navigation";
import Login from "./auth/login/login";
/* import Signup from "./auth/signup/signup"; */

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={["/login"]} component={Login}></Route>

          <Navigation />
        </Switch>
      </div>
    );
  }
}

export default App;
