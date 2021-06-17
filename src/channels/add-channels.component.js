import React, { Component } from "react";
import firebase from "firebase";
import channelsDataService from "../services/channels.service";
import { ToastContainer, toast } from "react-toastify";
export default class Addchannels extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangedetails = this.onChangedetails.bind(this);
    this.onChangedisplayName = this.onChangedisplayName.bind(this);
    this.onChangeavatar = this.onChangeavatar.bind(this);
    this.savechannels = this.savechannels.bind(this);
    this.newchannels = this.newchannels.bind(this);

    this.state = {
      // key: null,
      name: "",
      details: "",
      displayName: "",
      avatar: "",
      channelsRef: firebase.database().ref("channels"),
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.savechannels();
    }
  };
  onChangename(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  }
  onChangedisplayName(e) {
    this.setState({
      displayName: e.target.value,
    });
  }
  onChangeavatar(e) {
    this.setState({
      avatar: e.target.value,
    });
  }
  onChangedetails(e) {
    this.setState({
      details: e.target.value,
    });
  }

  savechannels = () => {
    const { channelsRef } = this.state;
    const key = channelsRef.push().key;
    let data = {
      id: key,
      name: this.state.name,
      details: this.state.details,
      createdBy: {
        name: this.state.displayName,
        avatar: this.state.avatar,
      },
    };

    channelsDataService
      .create(data)
      .then(() => {
        console.log("Created New Channel successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newchannels() {
    this.setState({
      name: "",
      details: "",
      submitted: false,
      name: "",
      avatar: "",
    });
  }
  isFormValid = ({ name, details }) => name && details;
  render() {
    const { currentchannels } = this.state;

    return (
      <div className="submit-form">
        {this.state.submitted == true ? (
          <div>
            <h4>Channel Create Sucessfully</h4>
            <button className="btn btn-success" onClick={this.newchannels}>
              Add
            </button>
          </div>
        ) : (
          <div className="">
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              {/* <div className="form-group">
              <label htmlFor="name">Channel ID</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.id}
                // onChange={this.onChangename}
                name="name"
              />
            </div> */}
              <h4>Create New Channel</h4>
              <div className="form-group">
                <label htmlFor="name">Channel Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChangename}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Channel Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="details"
                  required
                  value={this.state.details}
                  onChange={this.onChangedetails}
                  details="details"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">User name</label>
                <input
                  type="text"
                  className="form-control"
                  id="displayName"
                  required
                  value={this.state.displayName}
                  onChange={this.onChangedisplayName}
                  displayName="displayName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">User avatar</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  required
                  value={this.state.avatar}
                  onChange={this.onChangeavatar}
                  avatar="avatar"
                />
              </div>

              <button
                onSubmit={this.handleSubmit}
                type="submit"
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
