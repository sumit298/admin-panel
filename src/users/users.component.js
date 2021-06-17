import React, { Component } from "react";
import usersDataService from "../services/users.service";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import "./users.css";
export default class users extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangephotoUrl = this.onChangephotoUrl.bind(this);
    this.updateusers = this.updateusers.bind(this);
    this.deleteusers = this.deleteusers.bind(this);

    this.state = {
      currentusers: {
        key: null,
        name: "",
        email: "",
        photoUrl: [],
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { users } = nextProps;
    if (prevState.currentusers.key !== users.key) {
      return {
        currentusers: users,
        message: "",
      };
    }

    return prevState.currentusers;
  }

  componentDidMount() {
    this.setState({
      currentusers: this.props.users,
    });
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentusers: {
          ...prevState.currentusers,
          name: name,
        },
      };
    });
  }

  onChangephotoUrl(e) {
    const photoUrl = e.target.value;

    this.setState((prevState) => ({
      currentusers: {
        ...prevState.currentusers,
        photoUrl: photoUrl,
      },
    }));
  }

  updateusers() {
    const data = {
      name: this.state.currentusers.name,
      // email: firebase.auth().currentusers.email,
      photoUrl: this.state.currentusers.photoUrl,
    };

    usersDataService
      .update(this.state.currentusers.key, data)
      .then(() => {
        this.setState({
          message: "The users was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteusers() {
    usersDataService
      .delete(this.state.currentusers.key)

      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentusers } = this.state;
    console.log(currentusers);
    return (
      <div>
        <h4>users</h4>
        {currentusers ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">User-ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentusers.key}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentusers.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email-ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentusers.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photoUrl">User Profile</label>
                <div className="">
                  <img
                    src={currentusers.photoUrl}
                    className="profile"
                    alt="User Profile"
                  />
                </div>
                <input
                  type="file"
                  className="form-control"
                  id="photoUrl"
                  onChange={this.onChangephotoUrl}
                />
              </div>
            </form>

            <Button
              variant="contained"
              color="secondary"
              className="m-3  btn-sm "
              onClick={this.deleteusers}
            >
              Delete
            </Button>

            <Button
              className="m-3  btn-sm "
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.updateusers}
            >
              Update
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a users...</p>
          </div>
        )}
      </div>
    );
  }
}
