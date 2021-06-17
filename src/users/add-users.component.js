import React from "react";
import { Grid, Form, Segment, Header, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import md5 from "md5";
import firebase from "firebase";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
export default function Register() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [registerUserState, setRegisterUserState] =
    React.useState(initialState);
  const [errors, setErrors] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [userRef] = React.useState(firebase.database().ref("/users"));

  const handleChange = (event) => {
    setRegisterUserState({
      ...registerUserState,
      [event.target.name]: event.target.value,
    });
  };

  const formIsValid = () => {
    let errors = [];
    let error;
    if (isFormEmpty(registerUserState)) {
      error = { message: "Please fill in all the fields" };
      // toast.error("Please fill in all the fields");
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid(registerUserState)) {
      error = { message: "Password is invalid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ userName, email, password, confirmPassword }) => {
    return !userName || !email || !password || !confirmPassword;
  };

  const isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (formIsValid()) {
      const { email, password } = registerUserState;
      const errors = [];
      setErrors(errors);
      setStatus("PENDING");
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        try {
          await createdUser.user.updateProfile({
            displayName: userName,
            photoURL: `https://www.gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`,
            email: email,
          });
          await saveUser(createdUser);
          setStatus("RESOLVED");
        } catch (err) {
          setStatus("RESOLVED");
          setErrors(errors.concat({ message: err.message }));
        }
      } catch (err) {
        setStatus("RESOLVED");
        setErrors(errors.concat({ message: err.message }));
      }
    }
  };

  const saveUser = (createdUser) =>
    userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      photoUrl: createdUser.user.photoURL,
      email: createdUser.user.email,
    });

  const handleInputError = (errors, inputName) => {
    return errors.some((err) =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? "error"
      : "";
  };

  const { userName, email, password, confirmPassword } = registerUserState;

  return (
    <div className="form-add-group">
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="purple" textAlign="center">
            <Icon name="puzzle piece" color="purple" />
            Register New User
          </Header>
          <Form onSubmit={onSubmit}>
            <input
              fluid
              type="text"
              name="userName"
              icon="user"
              iconPosition="left"
              placeholder="User Name"
              value={userName}
              onChange={handleChange}
              className={handleInputError(errors, "userName")}
            />
            <input
              fluid
              type="email"
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className={handleInputError(errors, "email")}
            />
            <input
              type="password"
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className={handleInputError(errors, "password")}
            />
            <input
              type="password"
              name="confirmPassword"
              icon="redo"
              iconPosition="left"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className={handleInputError(errors, "password")}
            />
            <Button
              disabled={status === "PENDING"}
              className={status === "PENDING" ? "loading" : ""}
              type="submit"
              fluid
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </Form>
          {errors.length > 0 &&
            errors.map((err, i) => (
              <Message error key={i}>
                <h6>{err.message}</h6>
              </Message>
            ))}
        </Grid.Column>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
