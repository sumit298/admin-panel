import React, { Component } from "react";
import usersDataService from "../services/users.service";
import firebase from "firebase";
require("firebase/auth");
export default class Addusers extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangephotoUrl = this.onChangephotoUrl.bind(this);
    this.saveusers = this.saveusers.bind(this);
    this.newusers = this.newusers.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      photoUrl: "",
    };
  }

  onChangename(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangepassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangephotoUrl(e) {
    this.setState({
      photoUrl: e.target.value,
    });
  }

  saveusers() {
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      photoUrl: this.state.photoUrl,
    };

    /* usersDataService
      .create(data)
      .then(() => {
        console.log("Created User successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      }); */

    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.pass.value;
    const photoUrl = this.refs.photoUrl.value;
    console.log(email, password);

    const promise = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    promise.then((user) => {
      var error =
        "Signup Successfuly " +
        firebase.auth().currentUser.email +
        " Please Login";
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .set({
          email: firebase.auth().currentUser.email,
          name: name,
          photoUrl: photoUrl,
        });
      this.setState({ err: error });
    });

    promise.catch((e) => {
      var error = e.message;
      this.setState({ err: error });
    });
  }

  newusers() {
    this.setState({
      name: "",
      email: "",
      password: "",
      photoUrl: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newusers}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                ref="name"
                // value={this.state.name}
                onChange={this.onChangename}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailid">Email-ID</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                // value={this.state.email}
                ref="email"
                onChange={this.onChangeemail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                // value={this.state.password}
                ref="pass"
                onChange={this.onChangepassword}
                name="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="photoUrl">User Profile</label>

              <input
                type="file"
                className="form-control"
                id="photoUrl"
                required
                ref="photoUrl"
                // value={this.state.photoUrl}
                onChange={this.onChangephotoUrl}
                name="photoUrl"
              />
            </div>

            <button onClick={this.saveusers} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
