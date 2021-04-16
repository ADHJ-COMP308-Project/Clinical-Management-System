import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

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
    <div className="bg-white">
      {showLoading ? (
        <div className="text-center">
          <Spinner className="mt-5" animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          {console.log(tips)}

          {tips.map((item, index) => {
            return (
              <Jumbotron key={index}>
                <h2>{item.subject}</h2>
                <p>
                  {item.createdAt
                    .toString()
                    .substring(0, 19)
                    .replace("T", " ")
                    .replace("Z", "")}
                </p>
                <p>{item.tipMessage}</p>
                <p>{item.author.fullName}</p>
              </Jumbotron>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShowTips;
