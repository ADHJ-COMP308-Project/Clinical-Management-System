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

import DailyReportForm from "./components/Forms/DailyReportForm";
import EmergencyAlertForm from "./components/Forms/EmergencyAlertForm";
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

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        {/* <Switch> */}
        <div className="auth-wrapper">
          <div className="auth-inner">
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
            <Route
              path="/patientRegistration"
              render={() => <PatientRegistration />}
            />
            <Route
              path="/nurseRegisteration"
              render={() => <NurseRegistration />}
            />
            <Route path="/dailyReportForm" render={() => <DailyReportForm />} />
        <Route
          path="/emergencyAlertForm"
          render={() => <EmergencyAlertForm />}
        />
          </div>
          
        </div>

        
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
