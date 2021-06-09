import React, { Component } from "react";
import usersDataService from "../services/users.service";

export default class users extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    /*  this.onChangeemailid = this.onChangeemailid.bind(this); */
    this.onChangephotoUrl = this.onChangephotoUrl.bind(this);
    this.updateusers = this.updateusers.bind(this);
    this.deleteusers = this.deleteusers.bind(this);

    this.state = {
      currentusers: {
        key: null,
        name: "",
        /*  emailid: "", */
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

  /*  onChangeemailid(e) {
    const emailid = e.target.value;

    this.setState((prevState) => ({
      currentusers: {
        ...prevState.currentusers,
        emailid: emailid,
      },
    }));
  } */
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
      /*  emailid: this.state.currentusers.emailid, */
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
              {/*  <div className="form-group">
                <label htmlFor="emailid">Email-ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="emailid"
                  value={currentusers.emailid}
                  onChange={this.onChangeemailid}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="photoUrl">User Profile</label>
                <div
                  className=""
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                >
                  <img src={currentusers.photoUrl} className="profile" />
                </div>
                <input
                  type="file"
                  className="form-control"
                  id="photoUrl"
                  onChange={this.onChangephotoUrl}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteusers}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateusers}
            >
              Update
            </button>
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
