import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import axios from "axios";

import PatientRegistration from "./components/PatientRegistration";
import NurseRegistration from "./components/NurseRegistration";
import Login from "./components/Login";
// import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/login"}>
              Final Project
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/patientRegistration"}>
                    Patient Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/nurseRegisteration"}>
                    Nurse Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route
                path="/patientRegistration"
                exact
                render={(props) => <PatientRegistration />}
              />
              <Route
                path="/nurseRegisteration"
                exact
                render={(props) => <NurseRegistration />}
              />
              <Route path="/" render={() => <Login />} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
