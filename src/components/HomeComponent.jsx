import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../index";


const HomeComponent = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState(false);
  const [giftClicked, setGiftClicked] = useState(false);

  const studentLogin = () => navigate("/login");

  const handleSearch = () => {
    if (!searchData.trim()) return;
    search(searchData)
      .then((response) => {
        setCourses(response.data);
        setSearched(true);
        setSearchData("");
      })
      .catch(() => {
        setCourses([]);
        setSearched(true);
      });
  };

  const giftPopup = () => {
    // Show confetti
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.5, y: 0.1 },
    });

    // Hide gift and show "Hello"
    setGiftClicked(true);
  };

  return (
    <div className="cse-main">
      <div className="main-content" id="mainContent">
        {/* Gift box or Hello div */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {!giftClicked ? (
            <img
              src="/gift.png"
              className="shake img img-fluid"
              style={{ width: "300px", height: "300px", cursor: "pointer" }}
              alt="Gift Box"
              onClick={giftPopup}
            />
          ) : (
            <div
              style={{
                padding: "20px 40px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                fontWeight: "bold",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Hello
            </div>
          )}
        </div>

        {/* Top Row: Logo + Heading */}
        <div
          className="top-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <img
            src="/cselogo.png"
            alt="cselogo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
          <div className="welcome-text" style={{ textAlign: "left" }}>
            <h1>Welcome to CSE</h1>
            <p>Let's start your learning journey here</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-container" style={{ textAlign: "center" }}>
          <div className="search-box">
            <input
              type="text"
              name="searchData"
              placeholder="உங்களுக்கு தேவையான கம்ப்யூட்டர் பயிற்சியை இங்கே Type செய்யவும்"
              value={searchData}
              id="search"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>

        {/* Courses Section */}
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
                <div
                  key={course.id}
                  className="card h-100 shadow-sm text-center"
                >
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
                    <h5 className="card-title text-primary">
                      {course.courseName}
                    </h5>
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

        {/* Authentication buttons */}
        <div className="auth-container mt-5 text-center">
          <button
            id="studentLoginBtn"
            className="auth-btn primary"
            onClick={studentLogin}
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
