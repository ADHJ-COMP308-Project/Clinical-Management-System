import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function EmergencyAlertList(props) {
  const [alertList, setAlertList] = useState([]);
  const [ifError, setIfError] = useState(false);

  const getEmergencyAlerts = async () => {
    const apiUrl = "http://localhost:3000/api/emergencyAlerts";
    try {
      const response = await axios.get(apiUrl);
      if (!response) {
        console.log("Couldnt get the response");
      } else {
        var list = response.data;
        setAlertList(list);
        setIfError(false);
      }
    } catch (err) {
      console.log("Some error: " + err);
    }
  };

  //   const showAlert = (alertId)=>{
  //     console.log(props);
  //     props.history.push({
  //         pathname: '/showEmergencyAlert',
  //         alertId: alertId
  //     })
  //   };

  useEffect(() => {
    getEmergencyAlerts();
  }, []);

  return (
    <div>
      <h4>Emergency Alerts List</h4>
      <hr className="hr-primary" />
      {alertList.length !== 0 || alertList !== [] ? (
        <div>
          <ListGroup
            className="scrollbar scrollbar-primary  mt-3 mx-auto"
            style={{ maxHeight: "300px" }}
          >
            {alertList.map((item, idx) => (
              <ListGroup.Item
                key={idx}
                // onClick={() => {
                //   showAlert(item._id);
                // }}
              >
                {item.alertMessage} {item.patient}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <div>No emergency alerts</div>
      )}
    </div>
  );
}

export default EmergencyAlertList;
