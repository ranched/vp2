import "../css/Landing.css";
import React from "react";
import Navbar from "./Navbar";
import ModelFrame from "./ModelFrame";

const Landing = props => {
  return (
    <React.Fragment>
      <Navbar />
      <ModelFrame modelSource="http://vulgar-talk.surge.sh" />
    </React.Fragment>
  );
};

export default Landing;
