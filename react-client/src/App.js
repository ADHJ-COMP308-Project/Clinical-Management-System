import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./App.css";

import axios from "axios";

import PatientRegistration from "./components/PatientRegistration";
import NurseRegistration from "./components/NurseRegistration";
import Login from "./components/Login";

import DailyReportForm from "./components/DailyReportForm";

// import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar collapseOnSelect bg="light" expand="lg" className="fixed-top">
          <div className="container">
            <Link
              className="navbar-brand d-inline-block align-top"
              to={"/login"}
            >
              Final Project
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to={"/patientRegistration"}>
                  Patient Sign up
                </Link>

                <Link className="nav-link" to={"/nurseRegisteration"}>
                  Nurse Sign up
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            {/* <Switch> */}
            <Route
              path="/patientRegistration"
              render={() => <PatientRegistration />}
            />
            <Route
              path="/nurseRegisteration"
              render={() => <NurseRegistration />}
            />
            <Route path="/login" render={() => <Login />} />

            <Route path="/dailyReportForm" render={()=><DailyReportForm/>}/>
            {/* </Switch> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
