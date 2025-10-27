import React from 'react'
import  { useState } from "react";
import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const HomeComponent = () => {
 const navigate = useNavigate();
  const studentLogin =()=>{
   navigate("/login");
  }
  const staffLogin = ()=>{
    navigate("/staff-login");
  }
  return (
    <div className="cse-main">
      <div className="main-content" id="mainContent">
        <div className="welcome-div">
          <div className="welcome-text">
            <h1>Welcome to CSE</h1>
            <p>Let's start your learning journey here</p>
          </div>
          <img src="public/cselogo.png" alt="cselogo" className="img-fluid cselogo" />
        </div>


        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for courses, tutorials, or resources..."
            />
            <button type="submit">
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>

        <div className="auth-container">
          <button id="studentLoginBtn" className="auth-btn primary" onClick={studentLogin}>
            Student Login
          </button>
          <button id="staffLoginBtn" className="auth-btn secondary" onClick={staffLogin}>
            Staff Portal
          </button>
        </div>
      
      </div>
    </div >


  )

}

export default HomeComponent