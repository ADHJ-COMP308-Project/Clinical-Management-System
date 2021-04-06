import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./App.css";

import axios from "axios";

import PatientRegistration from "./components/PatientRegistration";
import NurseRegistration from "./components/NurseRegistration";
import Login from "./components/Login";
<<<<<<< Updated upstream

=======
import NavBarMenu from "./components/Navbar/NavbarMenu";
import DailyReportForm from "./components/Forms/DailyReportForm";
import EmergencyAlertForm from "./components/Forms/EmergencyAlertForm";
import DailyTipForm from "./components/Forms/DailyTipForm";
import ShowEmergencyAlert from "./components/ShowEmergencyAlert";
// import NurseHomePage from "./components/NurseHomePage";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Route exact path="/">
              <Redirect to="/login" />            
            </Route>
            {/* <Switch> */}
=======
        <div className="">
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          {/* <Switch> */}
          
              <div>
                <Route
                  path="/login"
                  render={() => (
                    <Login
                      isAuthenticated={isAuthenticated}
                      setIsAuthenticated={setIsAuthenticated}
                      setAuthData={setAuthData}
                    />
                  )}
                />
              </div>
>>>>>>> Stashed changes
              <Route
                path="/patientRegistration"
                render={() => <PatientRegistration />}
              />
              <Route
                path="/nurseRegisteration"
                render={() => <NurseRegistration />}
              />
<<<<<<< Updated upstream
              <Route path="/login" render={() => <Login />} />
            {/* </Switch> */}
          </div>
        </div>
=======
              <Route path="/dailyReportForm" render={() => <DailyReportForm />} />
              <Route
                path="/emergencyAlertForm"
                render={() => <EmergencyAlertForm />}
              />
              <Route path="/dailyTipForm" render={()=><DailyTipForm />} />
              <Route path="/showEmergencyAlert" render={() => <ShowEmergencyAlert />} />
              {/* <Route path="/nurseHomePage" render={()=><NurseHomePage />} /> */}
        </div>

          

        {/* </Switch> */}
>>>>>>> Stashed changes
      </div>
    </Router>
  );
}

export default App;
