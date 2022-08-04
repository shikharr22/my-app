import React from 'react';
import './App.css'
const Navbar=()=>{
    return (
    <>
    <div id="navbar">
        <img style={{width:"3vw",height:"6vh"}} src={require('./logo.png')}/>
        <p style={{color:"white",fontSize:"2rem",paddingLeft:"2vw"}}>Department of Mechanical Engineering</p>
    </div>
    </>
    );
}

export default Navbar;