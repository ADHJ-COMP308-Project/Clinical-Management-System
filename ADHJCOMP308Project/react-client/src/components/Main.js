import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { set } from "mongoose";


function Main(props) {
  const {role, setRole} = props;
  const {username, setUsername} = props;

  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setRole('');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    //readCookie();
  }, []);

  return (
    <div>
      <h1>Hi, {role} {username}</h1>
      <Button className="btn btn-danger"onClick={deleteCookie}>Log Out</Button>
    </div>

  );
}

export default withRouter(Main);
