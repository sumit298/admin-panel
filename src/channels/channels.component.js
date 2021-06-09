import React, { Component } from "react";
import channelsDataService from "../services/channels.service";

export default class channels extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangedetails = this.onChangedetails.bind(this);
    this.updatechannels = this.updatechannels.bind(this);
    this.deletechannels = this.deletechannels.bind(this);

    this.state = {
      currentchannels: {
        key: null,
        name: "",
       details:"",
       /* avatar:"", */
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { channels } = nextProps;
    if (prevState.currentchannels.key !== channels.key) {
      return {
        currentchannels: channels,
        message: "",
      };
    }

    return prevState.currentchannels;
  }

  componentDidMount() {
    this.setState({
      currentchannels: this.props.channels,
    });
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentchannels: {
          ...prevState.currentchannels,
          name: name,
        },
      };
    });
  }

  onChangedetails(e) {
    const details = e.target.value;

    this.setState((prevState) => ({
      currentchannels: {
        ...prevState.currentchannels,
        details: details,
      },
    }));
  }
  
  updatechannels() {
    const data = {
      name: this.state.currentchannels.name,
      details: this.state.currentchannels.details,
    };

    channelsDataService
      .update(this.state.currentchannels.key, data)
      .then(() => {
        this.setState({
          message: "The channels was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletechannels() {
    channelsDataService
      .delete(this.state.currentchannels.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentchannels } = this.state;

    return (
      <div>
        <h4>channels</h4>
        {currentchannels ? (
          <div className="edit-form">
            <form>
              {/* <div className="form-group">
                <label htmlFor="title">Avatar</label>
                <img
                  type="text"
                  className="form-control"
                  id="ID"
                  src={currentchannels.avatar}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="ID">Channel ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="ID"
                  value={currentchannels.key}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Channel Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentchannels.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="details">Deatils</label>
                <input
                  type="text"
                  className="form-control"
                  id="details"
                  value={currentchannels.details}
                  onChange={this.onChangedetails}
                />
              </div>
             
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletechannels}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatechannels}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a channels...</p>
          </div>
        )}
      </div>
    );
  }
}
