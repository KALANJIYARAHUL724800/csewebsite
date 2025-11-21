import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search, showAllBatches, showAllTestimonials, findBatch, insertFeesEnquiry, insertFeesEnquiryTemp } from "../index";
import { FaCheckCircle } from 'react-icons/fa';

const HomeComponent = () => {
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const [userLogin, setUserLogin] = useState(!token);
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
      setErrors(err.response.data);
    }
  };
  function openFormTemp() {
    setShowForm(true);
  }
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
    setErrors({});
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSubmit = {
      name: formData.name,
      phone: formData.phone,
      courseTitle: formData.course,
    };

    try {
      if (!dataToSubmit.courseTitle) {
        await insertFeesEnquiryTemp(dataToSubmit);
      } else {
        await insertFeesEnquiry(dataToSubmit);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        setFormData({ name: "", phone: "", course: "" });
        closePopup();
      }, 3000);
    } catch (err) {
      const apiErrors = err.response?.data || {};
      setErrors({
        name: apiErrors.name || "",
        phone: apiErrors.phone || "",
      });
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
    const token = localStorage.getItem("token");
    setUserLogin(!token);
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

        <div className="text-end">
          <button className="btn btn-success me-2 pd-2" onClick={openFormTemp}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1642/1642364.png"
              alt="enquiry"
              className="img-fluid"
              style={{ height: "30px", width: "30px" }}
            />
            Enquiry
          </button>
        </div>

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
          {userLogin && (
            <button
              id="studentLoginBtn"
              className="auth-btn primary"
              onClick={studentLogin}
            >
              Student Login
            </button>
          )}
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
        </div><br />

        {/* Testimonials Section */}
        {testimonials && testimonials.length > 0 && (
          <div className="container mt-5">

            <h2
              className="text-center mb-4"
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              Student Testimonials
            </h2>

            <style>
              {`
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
            </style>

            <div className="row g-4">
              {testimonials.map((t, index) => (
                <div key={index} className="col-12 col-md-4">

                  {/* OUTER BORDER EFFECT BOX */}
                  <div
                    style={{
                      position: "relative",
                      padding: "3px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Animated Border Layer */}
                    <div
                      style={{
                        content: "''",
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background:
                          "linear-gradient(45deg, #ff0000, green, #0000ff, yellow)",
                        animation: "rotateBorder 6s linear infinite",
                        zIndex: 1,
                      }}
                    ></div>

                    {/* INNER CARD */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "#fff",
                        borderRadius: "18px",
                        padding: "20px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* IMAGE */}
                      <div style={{ textAlign: "center", marginBottom: "15px" }}>
                        <img
                          src={t.imageUrl ? `/uploads/${t.imageUrl}` : "/default-user.png"}
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                          }}
                        />
                      </div>

                      {/* BASIC DETAILS */}
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginBottom: "15px",
                          fontSize: "14px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "5px",
                                width: "40%",
                                background: "#f8f9fa",
                              }}
                            >
                              Name
                            </th>
                            <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                              {t.name}
                            </td>
                          </tr>

                          <tr>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "5px",
                                background: "#f8f9fa",
                              }}
                            >
                              E No
                            </th>
                            <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                              {t.enrollno}
                            </td>
                          </tr>

                          <tr>
                            <th
                              style={{
                                border: "1px solid #ddd",
                                padding: "5px",
                                background: "#f8f9fa",
                              }}
                            >
                              Course
                            </th>
                            <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                              {t.courseName}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* TESTIMONIAL */}
                      <p
                        style={{
                          fontStyle: "italic",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          flexGrow: 1,
                          color: "#555",
                        }}
                      >
                        “{t.text}”
                      </p>
                    </div>
                  </div>
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
                {/* Name Field */}
                <label>Name:</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      border: errors.name ? "2px solid red" : "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "0.375rem 0.75rem",
                      paddingRight: errors.name ? "30px" : "0.75rem",
                      width: "100%",
                      marginBottom: "0.25rem",
                    }}
                  />
                  {errors.name && (
                    <i
                      className="bi bi-exclamation-circle-fill"
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  )}
                </div>
                {errors.name && (
                  <div style={{ color: "red", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                    {errors.name}
                  </div>
                )}

                {/* Phone Field */}
                <label>Phone:</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, phone: value });
                    }}
                    style={{
                      border: errors.phone ? "2px solid red" : "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "0.375rem 0.75rem",
                      paddingRight: errors.phone ? "30px" : "0.75rem",
                      width: "100%",
                      marginBottom: "0.25rem",
                    }}
                  />
                  {errors.phone && (
                    <i
                      className="bi bi-exclamation-circle-fill"
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "red",
                        fontSize: "1.2rem",
                      }}
                    ></i>
                  )}
                </div>
                {errors.phone && (
                  <div style={{ color: "red", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                    {errors.phone}
                  </div>
                )}

                {/* Hidden Date & Time */}
                <input type="hidden" name="currentDate" value={new Date().toLocaleDateString()} />
                <input type="hidden" name="currentTime" value={new Date().toLocaleTimeString()} />

                {/* Submit Button */}
                <button
                  type="button"
                  style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    padding: "0.5rem",
                    width: "100%",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>

              {/* Cancel Button */}
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
        <br /><br /><br />
      </div>
    </div>
  );
};

export default HomeComponent;
