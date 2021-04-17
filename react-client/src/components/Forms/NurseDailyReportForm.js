import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "";

function NurseDailyReportForm(props)
{
    console.log("props" + props.history.location.state);
  // const role = props.history.location.state.role;
  // const username = props.history.location.state.username;
  
  const [dailyBodyTemprature, setDailyBodyTemprature] = useState("");
  const [dailyPulseRate, setDailyPulseRate] = useState("");
  const [dailySystolicBloodPressure, setDailySystolicBloodPressure] = useState("");
  

  const [
    dailyDiastolicBloodPressure,
    setDailyDiastolicBloodPressure,
  ] = useState("");
  const [dailyRespiratoryRate, setDailyRespiratoryRate] = useState("");

  const [patientList, setPatientList] = useState([]);
  const [patient, setPatient]= useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [ifError, setIfError] = useState(false);

  const apiUrl = "http://localhost:3000/api/nurseDailyReports";

  const addDailyReport = (e) => {
    e.preventDefault();
    const data = {
      bodyTemprature: dailyBodyTemprature,
      pulseRate: dailyPulseRate,
      systolicBloodPressure: dailySystolicBloodPressure,
      diastolicBloodPressure: dailyDiastolicBloodPressure,
      respiratoryRate: dailyRespiratoryRate,
      patient: patient,
    };
    console.log("data" + data);
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("result" + response);
        if(response.data.message!="" || response.data.message!=undefined) {
          errorMessage.push(response.data.message);
          setIfError(true);
        }
        // if (!response) {
        //     console.log("Couldnt get the response");
        // } 
        else {
            var list = response.data;
            setPatientList(list);
            setIfError(false);
        }
        props.history.push("/login");
      })
      .catch((error) => {
        errorMessage.push(error.message);
        setIfError(true);
        console.log("error" + error);
      });
  };

  const getPatientList= () =>{
    var url = "http://localhost:3000/patients";
    console.log("in getPatientList")
    axios.get(url).then((response)=>{
      console.log(response.data);
      if(response.data.message.length()!==0){
        console.log("error Occcured");
      }
      setPatientList(response.data);
      // setShowLoading(false);
    }).catch((err)=>console.log(err));
  }
  useEffect(() => {
    getPatientList();//This retrieves the patient list itself.
  }, []);

  return (
    <div className="container main-wrapper">
      <div className="main-inner">
        <div>
          <h1>Patient Report Form</h1>
        </div>
        <div>
          {errorMessage.length !== 0 ? (
            <div>
              {errorMessage.map((item, index) => (
                <Alert className="text-center" variant="danger" key={index}>
                  {item}
                </Alert>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <Form onSubmit={addDailyReport}>
          <Form.Row>
              <Form.Group>
                <Form.Label for="patients">Pick a Patient:</Form.Label>
                <Form.Control 
                as="select" onChange={(e)=> setPatient(e.target.value)}>
                  {patientList.map((patient,index)=>(
                    <option key={index}>{patient.username}</option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Body Temprature</Form.Label>
              <small>( in °F)</small>
              <Form.Control
                name="dailyBodyTemprature"
                id="dailyBodyTemprature"
                placeholder="Enter Temprature"
                type="number"
                step="0.1"
                min="90"
                max="110"
                title="Temprature should be in range of 90°F to 108°F"
                required
                onChange={(e) => setDailyBodyTemprature(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Pulse Rate</Form.Label>
              <Form.Control
                name="dailyPulseRate"
                id="dailyPulseRate"
                placeholder="Enter Pulse Rate"
                type="number"
                min="0"
                max="500"
                step="1"
                required
                onChange={(e) => setDailyPulseRate(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Systolic Blood Pressure</Form.Label>
              <Form.Control
                name="dailySystolicBloodPressure"
                id="dailySystolicBloodPressure"
                placeholder="Enter Systolic Blood Pressure"
                type="number"
                min="0"
                required
                onChange={(e) => setDailySystolicBloodPressure(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Diastolic Blood Pressure</Form.Label>
              <Form.Control
                name="dailyDiastolicBloodPressure"
                id="dailyDiastolicBloodPressure"
                placeholder="Enter Diastolic Blood Pressure"
                type="number"
                min="0"
                required
                onChange={(e) => setDailyDiastolicBloodPressure(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Respiratory Rate</Form.Label>
              <Form.Control
                name="dailyRespiratoryRate"
                id="dailyRespiratoryRate"
                placeholder="Enter Respiratory Rate"
                type="number"
                min="0"
                required
                onChange={(e) => setDailyRespiratoryRate(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button className="btn btn-block" type="submit">
              Submit
            </Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(NurseDailyReportForm);