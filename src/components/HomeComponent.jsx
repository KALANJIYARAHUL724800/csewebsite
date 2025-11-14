import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search, showAllBatches, showAllTestimonials, findBatch, insertFeesEnquiry } from "../index";
import { FaCheckCircle } from 'react-icons/fa';

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const openForm = async (id) => {
    try {
      const res = await findBatch(id);
      const courseName = res.data.course;
      setFormData(prev => ({
        ...prev,
        course: courseName,
      }));
      setShowForm(true);
    } catch (error) {
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleSubmit = async () => {
    const dataToSubmit = {
      name: formData.name,
      phone: formData.phone,
      courseTitle: formData.course,
    };
    try {
      await insertFeesEnquiry(dataToSubmit);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        setFormData({ name: "", phone: "", course: "" });
        closePopup();
      }, 3000);
  
    } catch (err) {
      setShowSuccess(false);
    }
  };
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
        setHasBatches(false);
      });
    showAllTestimonials()
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data)
        } else {
          setTestimonials(false)
        }
      })
      .catch((err) => {
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
                          onClick={() => openForm(batch.id)}
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
          </div>
        </div>

        {/* Testimonials */}
        {testimonials && (
          <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold">Testimonials</h2>

            <div className="row g-4">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="col-12 col-md-6 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {/* BORDER ANIMATION */}
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "3px",
                      background: "linear-gradient(90deg, #0d6efd, #6f42c1, #0d6efd)",
                      backgroundSize: "200% 200%",
                      animation: "gradientMove 3s linear infinite",
                    }}
                  >
                    {/* INNER CARD */}
                    <div
                      className="shadow-lg d-flex flex-column flex-md-row p-3 align-items-start"
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        transition: "transform 0.3s",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {/* LEFT SIDE: IMAGE + DETAILS */}
                      <div
                        className="d-flex flex-column align-items-center mb-3 mb-md-0 me-md-4 text-center"
                        style={{ minWidth: "120px", flexShrink: 0 }}
                      >
                        <img
                          src={t.imageUrl ? `/uploads/${t.imageUrl}` : "/default-user.png"}
                          className="rounded-circle shadow mb-3"
                          width="90"
                          height="90"
                          alt={t.name}
                          style={{ objectFit: "cover" }}
                        />

                        {/* Inline table for smaller cards */}
                        <div style={{ fontSize: "0.9rem", textAlign: "center" }}>
                          <table className="table table-sm table-bordered mb-0" style={{ width: '100%' }}>
                            <tbody>
                              <tr>
                                <th style={{ width: '50%', textAlign: 'left' }}>Name:</th>
                                <td style={{ width: '60%', textAlign: 'left' }}>{t.name}</td>
                              </tr>
                              <tr>
                                <th style={{ textAlign: 'left' }}>Enroll No:</th>
                                <td style={{ textAlign: 'left' }}>{t.enrollno}</td>
                              </tr>
                              <tr>
                                <th style={{ textAlign: 'left' }}>Course:</th>
                                <td style={{ textAlign: 'left' }}>{t.courseName}</td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                      </div>

                      {/* DIVIDER */}
                      <div className="d-none d-md-block border-end mx-3"></div>

                      {/* RIGHT SIDE: TEXT INFO */}
                      <div className="flex-grow-1 d-flex flex-column justify-content-start">
                        <h5 className="fw-bold mb-2 text-center text-md-start">Information</h5>
                        <p
                          className="fst-italic mb-0"
                          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                        >
                          “{t.text}”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* INLINE KEYFRAMES */}
                  <style>
                    {`
              @keyframes gradientMove {
                0% {background-position: 0% 50%;}
                50% {background-position: 100% 50%;}
                100% {background-position: 0% 50%;}
              }
            `}
                  </style>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Show Form */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(5px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              zIndex: 999,
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                width: "90%",
                maxWidth: "500px",
                boxSizing: "border-box",
                margin: "auto 0",
              }}
            >
              <h3 className="text-center mb-3">Fees Form</h3>
              <form>
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <label>Phone:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                {/* Hidden fields for current date and time */}
                <input
                  type="hidden"
                  name="currentDate"
                  value={new Date().toLocaleDateString()}
                />
                <input
                  type="hidden"
                  name="currentTime"
                  value={new Date().toLocaleTimeString()}
                />

                <button
                  type="button"
                  className="btn btn-primary mt-2 w-100"
                  onClick={() =>
                    handleSubmit({
                      ...formData,
                      currentDate: new Date().toLocaleDateString(),
                      currentTime: new Date().toLocaleTimeString(),
                    })
                  }
                >
                  Submit
                </button>
              </form>

              <button
                type="button"
                className="btn btn-light mt-2 w-100"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Success Popup */}
        {showSuccess && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          >
            <div className="bg-white p-4 rounded shadow text-center" style={{ minWidth: "300px", maxWidth: "400px" }}>
              <FaCheckCircle size={50} style={{ color: 'green', marginBottom: '15px' }} />
              <h5 className="mb-2">Thank you so much!</h5>
              <p>Our staff will contact you shortly regarding the fees.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
