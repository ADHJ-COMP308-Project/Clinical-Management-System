import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function ShowEmergencyAlert(props) {
    console.log(props);
  const alertId = props.history.location.alertId;
  const apiUrl = "http://localhost:3000/api/emergencyAlerts/" + alertId;
  const [alert, setAlert] = useState({});

  const getAlert = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (!response) {
        console.log("some error");
      } else {
        console.log(response.data);
        setAlert(response.data)
      }
    } catch (err) {
        console.log('error: ' + err);
    }
  };

  useEffect(() => {
      getAlert();
  }, []);

  return (
    <div>
        <div>
            <Jumbotron>
                <h1>{alert.alertMessage}</h1>
                <p>{alert.patient}</p>
            </Jumbotron>
        </div>
    </div>
  );
}

export default ShowEmergencyAlert;
