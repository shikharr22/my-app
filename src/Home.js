import React, { useState, useEffect, useSyncExternalStore } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import "./App.css";
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
} from 'recharts';




const Home = () => {
  const [data, setData] = useState(0);
  const [length, setLength] = useState(0);
  const [shoulders, setShoulders] = useState(0);
  const [gauge, setGauge] = useState(0);
  const [endDiameter, setEndDiameter] = useState(0);
  const [reducedDiameter, setReducedDiameter] = useState(0);
  const [strain, SetStrain] = useState([]);
  const [stress, SetStress] = useState([]);
  const [load, setLoad] = useState(0);
  const [dataArray, setDataArray] = useState([[]]);
  const [data01,setData01]=useState([]);

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
      [length, shoulders, gauge, endDiameter, reducedDiameter, load, data],
    ]);
    console.log(
      length,
      shoulders,
      gauge,
      endDiameter,
      reducedDiameter,
      load,
      data
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
      setData01(current=>[...current,{x:currStrain,y:currStress}]);
      console.log(currStrain);
    }
    document.getElementById("graphDisplay").style.display = "";
  };

  const fetchData = async () => {
    const config = {
      apiKey: "AIzaSyDlNvPQylTWYrnJv_e0Me3H-zhUVhkhyZ0",
      authDomain: "esp32-a8211.firebaseapp.com",
      databaseURL: "https://esp32-a8211-default-rtdb.firebaseio.com",
      projectId: "esp32-a8211",
      storageBucket: "esp32-a8211.appspot.com",
      messagingSenderId: "766640214047",
      appId: "1:766640214047:web:014670ad020b32809f052a",
      measurementId: "G-4PC2Y79D6W",
    };

    const app = initializeApp(config);

    const dbRef = ref(getDatabase());

    get(child(dbRef, `Sensor/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val().distance);
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div id="container">
          <form id="dataForm" onSubmit={handleSubmit}>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
              OBSERVATIONS
            </p>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Total length(in mm)"
                onChange={handleLength}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Length between shoulders"
                onChange={handleShoulders}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Gauge Length"
                onChange={handleGauge}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Diameter at ends"
                onChange={handleEndDiameter}
              />
            </label>
            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Diameter at reduced section"
                onChange={handleReducedDiameter}
              />
            </label>

            <label style={{ margin: "1vh" }}>
              <input
                style={{
                  fontSize: "0.9rem",
                  width: "15rem",
                  height: "1.5rem",
                  padding: "0.2rem",
                }}
                type="text"
                placeholder="Load in kg"
                onChange={handleLoad}
              />
            </label>

            <input
              style={{ width: "10rem", height: "2rem", padding: "0.5rem" }}
              type="submit"
              value="Take Readings"
            />
            <input
              style={{ width: "10rem", height: "2rem", padding: "0.5rem" }}
              type="submit"
              value="End Experiment"
              onClick={handleEndExperiment}
            />
          </form>
        </div>
        <div
          id="graphDisplay"
          style={{
            position:"relative",
            top:"25vh",
            display: "none",
            width: "50vw",
            height: "100vh",
          }}
        >
          
          <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Strain" unit="cm" />
          <YAxis type="number" dataKey="y" name="Stress" unit="kg" />
          <ZAxis type="number" range={[100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="A school" data={data01} fill="#8884d8" line shape="dot" />
          
        </ScatterChart>
        </div>
      
      </div>
    </>
  );
};

export default Home;
