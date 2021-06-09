import React, { Component } from "react";
import channelsDataService from "../services/channels.service";
import Channels from "./channels.component";

export default class channelsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActivechannels = this.setActivechannels.bind(this);
    this.removeAllchannels = this.removeAllchannels.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      channels: [],
      currentchannels: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    channelsDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    channelsDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let channels = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      channels.push({
        key: key,
        name: data.name,
        details: data.details,
        
      });
    });

    this.setState({
      channels: channels,
    });
  }

  refreshList() {
    this.setState({
      currentchannels: null,
      currentIndex: -1,
    });
  }

  setActivechannels(channels, index) {
    this.setState({
      currentchannels: channels,
      currentIndex: index,
    });
  }

  removeAllchannels() {
    channelsDataService
      .deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { channels, currentchannels, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Channels List</h4>

          <ul className="list-group">
            {channels &&
              channels.map((channels, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivechannels(channels, index)}
                  key={index}
                >
                  {channels.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllchannels}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentchannels ? (
            <Channels channels={currentchannels} refreshList={this.refreshList} />
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
