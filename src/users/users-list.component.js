import React, { Component } from "react";
import usersDataService from "../services/users.service";
import Users from "./users.component";
import Button from "@material-ui/core/Button";
import "./users.css";

import VisibilityIcon from "@material-ui/icons/Visibility";
export default class usersList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveusers = this.setActiveusers.bind(this);
    this.removeAllusers = this.removeAllusers.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      users: [],
      currentusers: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    usersDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    usersDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let users = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      users.push({
        key: key,
        name: data.name,
        email: data.email,
        photoUrl: data.photoUrl,
      });
    });

    this.setState({
      users: users,
    });
  }

  refreshList() {
    this.setState({
      currentusers: null,
      currentIndex: -1,
    });
  }

  setActiveusers(users, index) {
    this.setState({
      currentusers: users,
      currentIndex: index,
    });
  }

  removeAllusers() {
    usersDataService
      .deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { users, currentusers, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((users, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                >
                  {users.name}
                  <VisibilityIcon
                    className="eyeIcon"
                    onClick={() => this.setActiveusers(users, index)}
                    key={index}
                  />
                </li>
              ))}
          </ul>

          <Button
            className="m-3  btn-sm "
            variant="contained"
            color="secondary"
            onClick={this.removeAllusers}
          >
            Remove All
          </Button>
        </div>
        <div className="col-md-6">
          {currentusers ? (
            <Users users={currentusers} refreshList={this.refreshList} />
          ) : (
            <div>
              <br />
              <h4> Click on a Username...</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}
