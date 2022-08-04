import React, { useState, useEffect, useSyncExternalStore } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import database from "./Firebase";
import "./App.css";

import {Link} from 'react-router-dom';
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
  const [strain, SetStrain] = useState([]);
  const [stress, SetStress] = useState([]);
  const [load, setLoad] = useState(0);
  const [dataArray, setDataArray] = useState([[]]);
  const [data01, setData01] = useState([]);

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
  };

  const handleEndExperiment = (e) => {
    e.preventDefault();
    console.log(dataArray);
    for (let i = 1; i < dataArray.length; i++) {
      let originalArea = 3.14 * dataArray[i][4] * dataArray[i][4] * 0.25;
      let currStress = (dataArray[i][5] * 9.81) / originalArea;

      console.log(currStress);
      let initialLength = dataArray[1][6];
      let currLength = dataArray[i][6];
      let currStrain = (currLength - initialLength) / dataArray[i][2];
      setData01((current) => [...current, { x: currStrain, y: currStress }]);
      console.log(currStrain);
    }
    document.getElementById("graphDisplay").style.display = "";
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
        <Link to="/" style={{textDecoration:"none",color:"black"}}>Back</Link>
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
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Total length(in mm)"
                onChange={handleLength}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Length between shoulders"
                onChange={handleShoulders}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Gauge Length"
                onChange={handleGauge}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Diameter at ends"
                onChange={handleEndDiameter}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Diameter at reduced section"
                onChange={handleReducedDiameter}
              />
            </label>

            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.8rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                  borderWidth: "0px 0px 2px 0px",
                  borderColor: "#2a3439",
                  marginBottom: "1rem",
                }}
                type="text"
                placeholder="Load in kg"
                onChange={handleLoad}
              />
            </label>

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
                cursor:"pointer"
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
                cursor:"pointer"
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
              right:0,
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
        </div>
      </div>
    </>
  );
};

export default Home;
