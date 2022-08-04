import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
const Start = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#62B5C8",
          background: "-webkit-linear-gradient(top left, #62B5C8, #D5ECEF)",
          background: "-moz-linear-gradient(top left, #62B5C8, #D5ECEF)",
          background: "linear-gradient(to bottom right, #62B5C8, #D5ECEF)",
        }}
      >
        <p
          style={{
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          UNIVERSAL TESTING MACHINE
        </p>
        <Link to="home" style={{ color: "black", textDecoration: "none" }}>
          Start Experiment
        </Link>
      </div>
    </>
  );
};

export default Start;
