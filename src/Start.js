import React from 'react';
import {Link} from 'react-router-dom';
import "./App.css";
const Start=()=>{
    return (
        <>
        <div style={{width:"100vw",height:"90vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <p
              style={{
                marginBottom: "2rem",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              UNIVERSAL TESTING MACHINE
            </p>
            <Link to="home" style={{color:"black",textDecoration:"none"}}>Start Experiment</Link>
        </div>
        </>
    );
}

export default Start;