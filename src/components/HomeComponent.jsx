import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search, showAllBatches, showAllTestimonials } from "../index";

const HomeComponent = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [courses, setCourses] = useState([]);
  const [searched, setSearched] = useState(false);
  const [giftClicked, setGiftClicked] = useState(false);
  const [batches, setBatches] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showBatchPopup, setShowBatchPopup] = useState(false);
  const [hasBatches, setHasBatches] = useState(false);
  const confettiInterval = useRef(null);
  useEffect(() => {
    showAllBatches()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setHasBatches(true);
          setBatches(response.data);
        } else {
          setHasBatches(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching batches:", err);
        setHasBatches(false);
      });
    showAllTestimonials()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          console.log(response.data);
          setTestimonials(response.data)
        } else {

        }
      })
      .catch((err) => {
        console.error("Error fetching batches:", err);
        setHasBatches(false);
      });
  }, []);

  const studentLogin = () => navigate("/login");

  const startConfetti = () => {
    if (confettiInterval.current) return;
    confetti({ particleCount: 100, startVelocity: 30, spread: 360, origin: { x: 0.5, y: 0.1 }, });
    confettiInterval.current = setInterval(() => {
      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
    }, 250);
  };

  const stopConfetti = () => {
    if (confettiInterval.current) {
      clearInterval(confettiInterval.current);
      confettiInterval.current = null;
    }
  };

  const giftPopup = () => {
    if (batches.length === 0) {
      alert("No batches available right now!");
      return;
    }
    const audio = new Audio("/partyPop/party.mp3");
    audio.play();
    setGiftClicked(true);
    setShowBatchPopup(true);
    startConfetti();
  };

  const closePopup = () => {
    setShowBatchPopup(false);
    setGiftClicked(false);
    stopConfetti();
    const randomDelay = Math.floor(Math.random() * 10000) + 5000;
    setTimeout(() => {
      if (hasBatches) {
        setGiftClicked(true);
        setShowBatchPopup(true);
        startConfetti();
      }
    }, randomDelay);
  };

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

  return (
    <div className="cse-main">
      <div className="main-content" id="mainContent">
        {/* Gift box or Batch popup */}
        {hasBatches && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              position: "relative",
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
              showBatchPopup && (
                <div
                  className="batch-popup"
                  style={{
                    padding: "20px 40px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    animation: "fadeIn 0.5s ease-in-out",
                    maxWidth: "400px",
                    textAlign: "center",
                  }}
                >
                  <h3>Available Batches</h3>
                  <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
                    {batches.map((batch) => (
                      <li
                        key={batch.id}
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ccc",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ textAlign: "left" }}>
                          <strong>{batch.course}</strong> <br />
                          Date: {batch.date} <br />
                          Time: {batch.time}
                        </div>
                        <a
                          href="/enquiry"
                          className="btn btn-success"
                          style={{
                            marginTop: "5px",
                            textDecoration: "none",
                            color: "white",
                            fontWeight: "bold",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            left: "10px"
                          }}
                        >
                          Fees
                        </a>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={closePopup}
                    style={{
                      marginTop: "15px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              )
            )}
          </div>
        )}

        {/* Top Row: Logo + Heading */}
        <div
          className="top-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
            padding: "0px"
          }}
        >
          <div className="scene" aria-hidden="true">
            <div className="cube" role="img" aria-label="Animated 3D cube">
              <div className="cube__face face-front"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
              <div className="cube__face face-back"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
              <div className="cube__face face-right"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
              <div className="cube__face face-left"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
              <div className="cube__face face-top"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
              <div className="cube__face face-bottom"><img src="/cselogo.png" className="cube-img img-fluid" /></div>
            </div>
          </div>
          <div className="welcome-text" style={{ textAlign: "left", position: "relative" }}>
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
                        Learn More
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
        <div className="container-fluid dflex mb-5 marquee-container">
          <div className="marquee-track">
            <img src="/gallery/Class-1.jpg" alt="Class 1" />
            <img src="/gallery/Class-2.jpg" alt="Class 2" />
            <img src="/gallery/cls3.jpg" alt="Class 3" />
            <img src="/gallery/Counselling-1.jpg" alt="Counselling 1" />
            <img src="/gallery/Counselling-2.jpg" alt="Counselling 2" />
            <img src="/gallery/Entrance.jpg" alt="Entrance" />
            <img src="/gallery/entrance2.jpg" alt="Entrance 2" />
            <img src="/gallery/Lab.png" alt="Lab" />

            {/* Duplicate for seamless infinite effect */}
            <img src="/gallery/Class-1.jpg" alt="Class 1" />
            <img src="/gallery/Class-2.jpg" alt="Class 2" />
            <img src="/gallery/cls3.jpg" alt="Class 3" />
            <img src="/gallery/Counselling-1.jpg" alt="Counselling 1" />
            <img src="/gallery/Counselling-2.jpg" alt="Counselling 2" />
            <img src="/gallery/Entrance.jpg" alt="Entrance" />
            <img src="/gallery/entrance2.jpg" alt="Entrance 2" />
            <img src="/gallery/Lab.png" alt="Lab" />
          </div>
        </div>

        <div className="container py-5">
          <h2 className="text-center mb-4">Testimonials</h2>
          <div className="row">
            {testimonials.map((t) => (
              <div key={t.id} className="col-md-6 mb-4">
                <div className="testimonial-card p-4 h-100 d-flex align-items-center justify-content-between shadow-sm">
                  <div className="text-center me-3 flex-shrink-0">
                    <img
                      src={
                        t.image
                          ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${t.image}`
                          : "/default-user.png"
                      }
                      alt={t.name}
                      className="rounded-circle mb-3 shadow-lg"
                      width="90"
                      height="90"
                      style={{ objectFit: "cover" }}
                    />
                    <h6 className="fw-bold mb-0">{t.name}</h6>
                    <p className="text-muted small mb-0">{t.courseName}</p>
                  </div>
                  <div className="flex-grow-1">
                    <p className="fst-italic text-muted mb-0">“{t.text}”</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default HomeComponent;
