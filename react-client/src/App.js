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
import NavBarMenu from "./components/Navbar/NavbarMenu";

import DailyReportForm from "./components/DailyReportForm";

// import Main from "./components/Main";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({});
  return (
    <Router>
      <div className="App">
          <div>
            <Route
              render={(props) => (
                <NavBarMenu
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  user={authData}
                  setUser={setAuthData}
                />
              )}
            />
          </div>

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

            <Route path="/dailyReportForm" render={() => <DailyReportForm />} />
            {/* </Switch> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
