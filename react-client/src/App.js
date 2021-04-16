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
import ShowEmergencyAlert from "./components/ShowEmergencyAlert";
import PatientList from "./components/PatientList";
import StrokeAI from "./components/StrokeAI";
import AIResult from "./components/AIResults";
// import Main from "./components/Main";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({});

  return (
    <Router>
      <div className="App">
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
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
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

        <div className="container" style={{paddingTop:'8vh',paddingBottom:'8vh'}}>
          <div className="">
            <Route path="/dailyReportForm" render={() => <DailyReportForm />} />
            <Route
              path="/emergencyAlertForm"
              render={() => <EmergencyAlertForm />}
            />
            <Route
              path="/showEmergencyAlert/:id"
              render={() => <ShowEmergencyAlert />}
            />
              <Route path="/patientList" render={() => <PatientList />} />
              <Route render={() => <StrokeAI />} path="/StrokeAI" />
              <Route render={() => <AIResult />} path="/AIResult" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
