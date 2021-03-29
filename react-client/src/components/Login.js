import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Main from "./Main";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);

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

  const login = async () => {
    if (
      loginEmail == null ||
      loginPassword == null ||
      loginEmail == "" ||
      loginPassword == ""
    ) {
      return false;
    }
    var data = {
      auth: {
        username: loginEmail,
        password: loginPassword,
      },
    };
    try {
      const response = await axios.post(url, data);
      console.log("response.data.role: " + response.data.role);
      if (response.data.role !== undefined) {
        setRole(response.data.role);
        setUsername(response.data.username);
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  return (
    <div className="main-wrapper">
      {role === "" ? (
        <div className="login-wrapper">
          <h1>Login</h1>
          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="username"
                id="username"
                placeholder="email"
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
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
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
          <Button className="btn btn-block" onClick={login}>
            Log in
          </Button>
          </Form.Row>
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
