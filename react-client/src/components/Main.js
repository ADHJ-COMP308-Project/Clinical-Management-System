import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import EmergencyAlertForm from "./Forms/EmergencyAlertForm";
import NurseHomePage from "./components/NurseHomePage";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Main(props) {
  console.log(props);
  const { userId, setUserId } = props;
  const { username, setUsername } = props;
  const { user, setUser } = props;
  const { setIsAuthenticated } = props;
  const [report, setReport] = useState({});
  const [dailyReportRequired, setDailyReportRequired] = useState(false);
  const { role, setRole } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("user._id: " + userId);

  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setIsAuthenticated(false);
      setRole("");
    } catch (e) {
      console.log(e);
    }
  };
  const addDailyReport = () => {
    props.history.push({
      pathname: "/dailyReportForm",
      state: {
        role: role,
        username: username,
      },
    });
  };

  // const addEmergencyAlert = () => {
  //   props.history.push({
  //     pathname: "/emergencyAlertForm",
  //     state: {
  //       role: role,
  //       username: username,
  //     },
  //   });
  // };

  const getLatestReport = async () => {
    console.log("in getLatestReport. userId: " + userId);
    const url = "http://localhost:3000/api/dailyReports/latest/users/" + userId;
    try {
      const response = await axios.get(url);
      console.log("response:" + response);

      if (!response.data.message == "No records found") {
        console.log("No old records for user: " + username);
        setDailyReportRequired(true);
        return false;
      } else {
        //if no timestamps in the response display add report button
        if (!response.data.createdAt || response.data.createdAt == null) {
          setDailyReportRequired(true);
        } else {
          //display the add report button only if the user have not added daily report for 24 hours
          console.log("response.data: " + response.data);
          console.log("Response.data.createdAt" + response.data.createdAt);
          setReport(response.data);
          setDailyReportRequired(false);
          var createdAt = new Date(response.data.createdAt);
          console.log("Converted createdAt: " + createdAt);
          var dateNow = new Date();
          console.log("date Now: " + dateNow);
          var timeDifference = Math.abs(dateNow - createdAt);
          console.log("dateDifference: " + timeDifference);
          var dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
          console.log("dayDifference: " + dayDifference);
          if (dayDifference > 1) {
            setDailyReportRequired(true);
          } else {
            setDailyReportRequired(false);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const getListOfPreviousVisits = async()=>{
  //   const url = ""
  // };

  useEffect(() => {
    if (user.role == "patient") {
      getLatestReport();
    }
    // if (user.role=="nurse"){
    //   //to do if nurse
    // }
  }, []);

  return (
    <div className="container">
      <h1>
        Hi, {role} {username}
      </h1>
      {role == "patient" ? (
        <div>
          {dailyReportRequired == true ? (
            <div>
              <Button className="btn btn-primary" onClick={addDailyReport}>
                Add Report
              </Button>
            </div>
          ) : (
            <div>{/* {code if daily report not required} */}</div>
          )}
          <hr></hr>
          <Alert variant="secondary">
          <div className="row">
            <div className="col-md-12">
              <Form.Control 
                placeholder="Send an Emergency Alert to the Doctor...."
                onClick={handleShow}
              />
              
                <Modal
                  show={show}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  onHide={handleClose}
                >
                  <EmergencyAlertForm
                    handleClose={handleClose}
                    handleShow={handleShow}
                    role={role}
                    username={username}
                  />
                </Modal>
              {/* <Button className="btn btn-danger" onClick={addEmergencyAlert}>
                 Send Emergency Alert
               </Button> */}
            </div>
          </div>
          </Alert>
        </div>
      ) : (
        <div>
          <NurseHomePage user={user} userId={userId} role={role} username={username}/>
        </div>
      )}
    </div>
  );
}

export default withRouter(Main);
