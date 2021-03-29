import React, { useState, useEffect } from "react";

import axios from "axios";

import { withRouter } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Formik, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

function NurseRegistration(props) {

  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerRole, setRegisterRole] = useState("");
  const [regiserPassword, setRegisterPassword] = useState("");

  const url = "http://localhost:3000/";

  //logic to send to the backend
  const register = (e) => {
    e.preventDefault();
    const data = {
      firstName: registerFirstName,
      lastName: registerLastName,
      username: registerUsername,
      password: regiserPassword,
      address: registerAddress,
      phoneNumber: registerPhoneNumber,
      role: "nurse",
    };
    console.log("Data" + data.lastName);
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        props.history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Patient Registration</h1>
      <Form onSubmit={register}>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              name="firstName"
              id="firstName"
              placeholder="firstName"
              type="text"
              onChange={(e) => setRegisterFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              name="lastName"
              id="lastName"
              placeholder="lastName"
              type="text"
              onChange={(e) => setRegisterLastName(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="username"
              id="username"
              placeholder="email"
              type="email"
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              id="address"
              placeholder="address"
              type="text"
              onChange={(e) => setRegisterAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>phoneNumber</Form.Label>
            <Form.Control
              name="phoneNumber"
              id="phoneNumber"
              placeholder="phoneNumber"
              type="text"
              onChange={(e) => setRegisterPhoneNumber(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              id="password"
              type="password"
              placeholder="password"
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Button className="btn btn-block"type="submit">Register</Button>
        </Form.Row>
      </Form>
    </div>
  );
}

export default withRouter(NurseRegistration);
