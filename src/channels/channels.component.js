import React, { Component } from "react";
import channelsDataService from "../services/channels.service";
import Button from "@material-ui/core/Button";
export default class channels extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangedetails = this.onChangedetails.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.updatechannels = this.updatechannels.bind(this);
    this.deletechannels = this.deletechannels.bind(this);

    this.state = {
      currentchannels: {
        key: null,
        name: "",
        details: "",
        createdBy: [],
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
  onChangeusername(e) {
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
    console.log(currentchannels.createdBy);
    return (
      <div>
        <h4>Channel Information</h4>
        {currentchannels ? (
          <div className="edit-form">
            <form>
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
              <div className="form-group">
                <label htmlFor="title"> User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentchannels.createdBy.name}
                  // onChange={this.onChangeusername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">User Avatar</label>
                <div
                  className=""
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                >
                  <img
                    type="file"
                    className="profile"
                    id="avatar"
                    src={currentchannels.createdBy.avatar}
                  />
                </div>
              </div>
            </form>

            <Button
              className="m-3  btn-sm "
              type="submit"
              variant="contained"
              color="secondary"
              onClick={this.deletechannels}
            >
              Delete
            </Button>

            <Button
              color="secondary"
              className="m-3  btn-sm "
              type="submit"
              variant="contained"
              onClick={this.updatechannels}
            >
              Update
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <h4> Click on a channels...</h4>
          </div>
        )}
      </div>
    );
  }
}
