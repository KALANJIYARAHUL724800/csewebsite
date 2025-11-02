import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCourse } from "../index";
const HomeComponent = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState(false);
  const studentLogin = () => navigate("/login");
  const staffLogin = () => navigate("/staff-login");
  const handleSearch = () => {
    if (!searchData.trim()) return;
    searchCourse(searchData)
      .then((response) => {
        setCourses(response.data);
        setSearched(true);
        setSearchData("");
      })
      .catch((error) => {
        setCourses([]);
        setSearched(true);
      });
  };
  return (
    <div className="cse-main">
      <div className="main-content" id="mainContent">
        <div className="welcome-div">
          <div className="welcome-text">
            <h1>Welcome to CSE</h1>
            <p>Let's start your learning journey here</p>
          </div>
          <img
            src="public/cselogo.png"
            alt="cselogo"
            className="img-fluid cselogo"
          />
        </div>
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              name="searchData"
              placeholder="Search for courses, tutorials, or resources..."
              value={searchData}
              id="search"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
        {searched && courses.length > 0 && (
          <div className="container py-5 position-relative" id="courses">
            <button
              className="btn btn-outline-danger btn-sm position-absolute"
              style={{ top: "10px", right: "10px", zIndex: 10 }}
              onClick={() => {
                setCourses([]);
                setSearched(false);
              }}
            >
              ✖ close all
            </button>
            <h1 className="text-center mb-5 text-primary">Available Courses</h1>
            <div
              className="courses-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {courses.map((course) => (
                <div key={course.id} className="card h-100 shadow-sm text-center">
                  <img
                    src={course.logoUrl || "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid mx-auto mt-3"
                    alt={course.courseName}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{course.courseName}</h5>
                    <p className="card-text">{course.courseContent}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="text-muted">
                        <i className="fas fa-clock"></i> {course.month}
                      </span>
                      <a
                        href={`/course/${course.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Enroll Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {searched && courses.length === 0 && (
          <p className="text-center text-danger mt-4">
            No courses found for your search.
          </p>
        )}
        <div className="auth-container mt-5">
          <button
            id="studentLoginBtn"
            className="auth-btn primary"
            onClick={studentLogin}
          >
            Student Login
          </button>
          <button
            id="staffLoginBtn"
            className="auth-btn secondary"
            onClick={staffLogin}
          >
            Staff Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
