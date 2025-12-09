import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
const HeaderComponent = () => {
  const [login, setLogin] = useState(() => localStorage.getItem("token"));
  const [userType, setUserType] = useState(() => localStorage.getItem("userType") === "true");
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userType") === "true";
      setUserType(user);
      setLogin(token);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg header sticky-top">
      <div className="container-fluid">

        <a className="navbar-brand fw-bold header-logo" href="#">
          <img src="/cselogo.png" alt="cselogo" className='cse-headinglogo' />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/home">
                <i className="bi bi-house-door-fill me-1"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                <i className="bi bi-info-circle-fill me-1"></i> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">
                <i className="bi bi-book-fill me-1"></i> Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">
                <i className="bi bi-calendar-event-fill me-1"></i> Event
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                <i className="bi bi-telephone-fill me-1"></i> Contact Info
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">
                <i className="bi bi-image-fill me-1"></i> Gallery
              </a>
            </li>
            {login && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={userType ? "/dashboard" : "/student-dashboard"} 
                >
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </a>
              </li>
            )}

            {login && (
              <li className="nav-item" onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("email");
                window.location.href = "/home";
              }}>
                <a className="nav-link text-danger" href="#">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </a>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default HeaderComponent;
