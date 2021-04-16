import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";

function ShowTips(props) {
  const [tips, setTips] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:5000/api/dailyTips";

  const getTips = () => {
    console.log("in getTips");
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setTips(response.data);
        setShowLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTips();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="tips-inner">
        {showLoading ? (
          <div className="text-center">
            <Spinner className="mt-5" animation="border" role="status">
              <span className="sr-only">Waiting for results...</span>
            </Spinner>
          </div>
        ) : (
          <div>
            {tips.length<1?(<div>
              <div className="alert alert-danger">
                No tips
              </div>
            </div>):(<div>
              {tips.map((item, index) => {
              return (
                <div className="text-left">
                  <Card className="shadow mt-2 bg-white rounded ">
                    <Card.Header key={index} className="font-weight-bold  bg-info text-white">{item.subject}</Card.Header>
                    <Card.Body>
                      <Card.Title className="ml-3">
                        {item.author.fullName}{" "}
                        {item.createdAt
                          .toString()
                          .substring(0, 19)
                          .replace("T", " ")
                          .replace("Z", "")}
                      </Card.Title>
                      <hr style={{backgroundColor:'rgba(66,133,244,.8)',height:'1px'}}/>
                      <Card.Text className="ml-3">{item.tipMessage}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
            </div>)}
            
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowTips;
