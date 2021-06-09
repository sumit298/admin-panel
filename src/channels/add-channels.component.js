import React, { Component } from "react";
import channelsDataService from "../services/channels.service";
export default class Addchannels extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangedetails = this.onChangedetails.bind(this);
    this.savechannels = this.savechannels.bind(this);
    this.newchannels = this.newchannels.bind(this);

    this.state = {
      name: "",
      details: "",
    };
  }

  onChangename(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangedetails(e) {
    this.setState({
      details: e.target.value,
    });
  }

  savechannels() {
    let data = {
      name: this.state.name,
      details: this.state.details,
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
  }

  newchannels() {
    this.setState({
      name: "",
      details: "",
      submitted: false,
      /*  createdBy: {
        name: user.displayName,
        avatar: user.photoURL,*/
    });
  }

  render() {
    const { currentchannels } = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newchannels}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Channel Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
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

            <button onClick={this.savechannels} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
