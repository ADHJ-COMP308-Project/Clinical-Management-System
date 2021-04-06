import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";


import NurseHomePage from "./NurseHomePage";
import PatientHomePage from "./PatientHomePage";


function Main(props) {
  console.log(props);
  const { userId, setUserId } = props;
  const { username, setUsername } = props;
  const { user, setUser } = props;
  const { setIsAuthenticated } = props;
  const { role, setRole } = props;

  console.log("user._id: " + userId);

  const addDailyReport = () => {
    props.history.push({
      pathname: "/dailyReportForm",
      state: {
        role: role,
        username: username,
      },
    });
  };

  return (
    <div className="container">
      <h1>
        Hi, {role} {username}
      </h1>
      {role == "patient" ? (
        //
        <div>
          <PatientHomePage
            user={user}
            username={username}
            userId={userId}
            addDailyReport={addDailyReport}
            role={role}
          />
        </div>
      ) : (
        <div>
          <NurseHomePage
            user={user}
            username={username}
            userId={userId}
            role={role}
          />
        </div>
      )}
    </div>
  );
}

export default withRouter(Main);
