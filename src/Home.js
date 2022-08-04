import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import database from "./Firebase";
import "./App.css";

import { Link } from "react-router-dom";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const [data, setData] = useState({});
  const [length, setLength] = useState(0);
  const [shoulders, setShoulders] = useState(0);
  const [gauge, setGauge] = useState(0);
  const [endDiameter, setEndDiameter] = useState(0);
  const [reducedDiameter, setReducedDiameter] = useState(0);
  const [elongation, setElongation] = useState(0);
  const [tensile, setTensile] = useState(0);
  const [breaking, setBreaking] = useState(0);
  const [load, setLoad] = useState(0);
  const [dataArray, setDataArray] = useState([[]]);
  const [data01, setData01] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const handleShoulders = (e) => {
    setShoulders(e.target.value);
  };
  const handleGauge = (e) => {
    setGauge(e.target.value);
  };
  const handleEndDiameter = (e) => {
    setEndDiameter(e.target.value);
  };
  const handleReducedDiameter = (e) => {
    setReducedDiameter(e.target.value);
  };

  const handleLoad = (e) => {
    setLoad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataArray((current) => [
      ...current,
      [
        length,
        shoulders,
        gauge,
        endDiameter,
        reducedDiameter,
        load,
        data.distance,
      ],
    ]);
    console.log(
      length,
      shoulders,
      gauge,
      endDiameter,
      reducedDiameter,
      load,
      data.distance
    );
    setCounter(counter + 1);
  };

  const handleEndExperiment = (e) => {
    e.preventDefault();
    console.log(dataArray);
    let maxLoad = 0;
    let originalArea;
    for (let i = 1; i < dataArray.length; i++) {
      originalArea = 3.14 * dataArray[i][4] * dataArray[i][4] * 0.25;
      let currStress = (dataArray[i][5] * 9.81) / originalArea;

      console.log(currStress);
      let initialLength = dataArray[1][6];
      let currLength = dataArray[i][6];
      let currStrain = (currLength - initialLength) / dataArray[i][2];
      setData01((current) => [...current, { x: currStrain, y: currStress }]);
      console.log(currStrain);
      if (dataArray[i][5] > maxLoad) {
        maxLoad = dataArray[i][5];
      }
    }
    document.getElementById("graphDisplay").style.display = "";
    document.getElementById("container").style.width = "50vw";

    let lastDist = dataArray[dataArray.length - 1][6];
    let firstDist = dataArray[1][6];
    setElongation((lastDist - firstDist) / gauge);

    setTensile(maxLoad / originalArea);
    setBreaking(dataArray[dataArray.length - 1][5] / originalArea);
  };

  const dbRef = ref(database);

  const fetchData = async () => {
    get(child(dbRef, `Sensor/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      <button
        style={{
          width: "4vw",
          height: "4vh",
          border: "none",
          backgroundColor: "white",
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "100",
          margin: "3.5vh",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Back
        </Link>
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div id="container">
          <form id="dataForm" onSubmit={handleSubmit}>
            <p
              style={{
                marginBottom: "2rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              OBSERVATIONS
            </p>
            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}>Total length(in mm)</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Total length(in mm)"
                onChange={handleLength}
              />
            </label>
            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}>Length between shoulders</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Length between shoulders"
                onChange={handleShoulders}
              />
            </label>
            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}>Gauge Length</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Gauge Length"
                onChange={handleGauge}
              />
            </label>
            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}> Diameter at ends</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Diameter at ends"
                onChange={handleEndDiameter}
              />
            </label>
            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}>Diameter at reduced section</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Diameter at reduced section"
                onChange={handleReducedDiameter}
              />
            </label>

            <label style={{ margin: "1vh" }}>
            <p style={{fontSize:"0.8rem"}}>Load in kg</p>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                  backgroundColor: "transparent",
                }}
                type="text"
                placeholder="Load in kg"
                onChange={handleLoad}
              />
            </label>
            <p
              style={{
                marginBottom: "2rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Total readings: {counter}
            </p>
            <input
              style={{
                color: "white",
                backgroundColor: "#2a3439",
                fontSize: "0.8rem",
                marginBottom: "1rem",
                width: "10rem",
                height: "2rem",
                padding: "0.5rem",
                border: "none",
                borderRadius: "0.2rem",
                cursor: "pointer",
              }}
              type="submit"
              value="Take Readings"
            />

            <input
              style={{
                color: "white",
                backgroundColor: "#2a3439",
                fontSize: "0.8rem",
                marginBottom: "1rem",
                width: "10rem",
                height: "2rem",
                padding: "0.5rem",
                border: "none",
                borderRadius: "0.2rem",
                cursor: "pointer",
              }}
              type="submit"
              value="End Experiment"
              onClick={handleEndExperiment}
            />
          </form>
        </div>
        <div
          id="graphDisplay"
          style={{
            position: "relative",
            top: "25vh",
            left: "10vh",
            display: "none",
            width: "50vw",
            height: "100vh",
          }}
        >
          <ScatterChart
            width={600}
            height={400}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 50,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Strain" unit="" />
            <YAxis type="number" dataKey="y" name="Stress" unit="N/mm^2" />
            <ZAxis type="number" range={[100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter
              name="data points"
              data={data01}
              fill="#8884d8"
              line
              shape="dot"
            />
          </ScatterChart>
          <p
            style={{
              marginBottom: "2rem",
              fontSize: "1.0rem",
              fontWeight: "bold",
            }}
          >
            % Elongation:{" "}
            <span style={{ fontSize: "0.8rem", color: "green" }}>
              {(elongation*100).toFixed(5)}% {" "}
            </span>
          </p>
          <p
            style={{
              marginBottom: "2rem",
              fontSize: "1.0rem",
              fontWeight: "bold",
            }}
          >
            Tensile Strength:{" "}
            <span style={{ fontSize: "0.8rem", color: "green" }}>
              {" "}
              {tensile.toFixed(5)} N/mm*mm{" "}
            </span>
          </p>
          <p
            style={{
              marginBottom: "2rem",
              fontSize: "1.0rem",
              fontWeight: "bold",
            }}
          >
             Breaking Strength:{" "}
            <span style={{ fontSize: "0.8rem", color: "green" }}>
              {" "}
              {breaking.toFixed(5)} N/mm*mm{" "}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
