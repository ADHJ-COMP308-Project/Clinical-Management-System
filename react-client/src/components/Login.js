import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Main from "./Main";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [ifError, setIfError] = useState(false);

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const url = "http://localhost:3000/signin";

  const readCookie = async () => {
    try {
      const response = await axios.get("http://localhost:3000/read_cookie");
      if (response.data.loggedIn == true) {
        setRole(response.data.user.role);
        setUsername(response.data.user.username);
        console.log("Username" + response.data.username);
      } else {
        console.log("in read cookie. user not found");
        setRole("");
      }
    } catch (err) {
      console.log(err);
      setRole("");
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  function validation() {
    if (loginEmail == null || loginEmail == "") {
      var err = errorMessage;
      err.push("Please enter valid Email Address");
      setErrorMessage(err);
      setIfError(true);
    }

    if (loginPassword == null || loginPassword == "") {
      var err = errorMessage;
      err.push("Please enter valid Password");
      setErrorMessage(err);
      setIfError(true);
    } else if (!isEmail(loginEmail)) {
      console.log("ok : " + isEmail(loginEmail));
      var err = errorMessage;
      setIfError(true);
      err.push("Please enter valid format for Email Address");
      setErrorMessage(err);
    }
  }

  function isEmail(email) {
    return validEmailRegex.test(email);
  }

  const login = () => {
    console.log("List not cleared: " + errorMessage);
    errorMessage.forEach((element) => {
      errorMessage.pop(element);
    });
    console.log("List cleared: " + errorMessage);
    if (
      loginEmail == "" ||
      loginPassword == "" ||
      isEmail(loginEmail) == false
    ) {
      validation();
      setIfError(true);
      console.log("error list: " + errorMessage);
      return false;
    }
    var data = {
      auth: {
        username: loginEmail,
        password: loginPassword,
      },
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log("response.data.message: " + response.data.status);
        if (response.data.status == 401) { //if user not found or password is invalid returns message from rest server
          var err = errorMessage;
          err.push(response.data.message);
          setErrorMessage(err);
          setIfError(true);
          console.log("In response error: " + errorMessage);
        } else {
          console.log("response.data.role: " + response.data.role);
          if (response.data.role !== undefined) { //if logged in successfully
            setRole(response.data.role);
            setUsername(response.data.username);
          }
        }
      })
      .catch((e) => {
        var err = errorMessage;
        err.push(e.Error);
        console.log("error: " + e);
        setErrorMessage(err);
        setIfError(true);
      });
  };

  return (
    <div className="main-wrapper">
      {role === "" ? (
        <div className="login-wrapper">
          <h1>Login</h1>
          <div>
            {errorMessage.length !== 0 ? (
              <div>
                <Alert className="text-center" variant="danger">
                  {errorMessage.map((item, index) => (
                    <pre key={index}>{item}</pre>
                  ))}
                </Alert>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="username"
                id="username"
                placeholder="email"
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                placeholder="password"
                type="password"
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Button className="btn btn-block" type="submit" onClick={login}>
              Log in
            </Button>
          </Form.Row>

          <div className="mt-3">
            <p class="text-center">
              Not have an account?{" "}
              <a href="/patientRegistration">
                Sign Up as a Patient
              </a>
            </p>
            <p class="text-center">
              Not a patient?{" "}
              <a  href="/nurseRegisteration">
                Sign Up as a Nurse
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Main
          role={role}
          setRole={setRole}
          username={username}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default withRouter(Login);
