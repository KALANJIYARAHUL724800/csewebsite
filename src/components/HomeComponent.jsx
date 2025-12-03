import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search, showAllBatches, showAllTestimonials, findBatch, insertFeesEnquiry, insertFeesEnquiryTemp } from "../index";
import { FaCheckCircle } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
const HomeComponent = () => {
  const galleryImages = [
    "public/gallery/entrance2.jpg",
    "public/gallery/Entrance.jpg",
    "public/gallery/Counselling-2.jpg"
  ];
  const [currentImage, setCurrentImage] = useState(0);
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
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
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
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  if (!testimonials || testimonials.length === 0) return null;
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
        {/* image scroll */}
        <section
          className="hero-section text-center d-flex align-items-center justify-content-center position-relative"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${galleryImages[currentImage]}) center/cover no-repeat`,
            minHeight: "100vh",
            marginBottom: 0,
            padding: 0,
          }}
        >
          {/* Enquiry button top-right */}
          <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
            <button className="btn btn-success me-2 pd-2" onClick={openFormTemp}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1642/1642364.png"
                alt="enquiry"
                style={{ height: "30px", width: "30px" }}
              />
              Enquiry
            </button>
          </div>

          <div data-aos="fade-down">
            <img src="public/cselogo.png" alt="CSE Logo" style={{ height: "180px" }} />
            <h1 className="display-5 fw-bold mt-4 welcome-home">Welcome to Cse</h1>
            <p className="lead text-light para">Empowering Minds, Shaping Futures</p>
          </div>
        </section>

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
                  <h3 className="heading">Available Batches</h3>
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
                          <strong className="heading">{batch.course}</strong> <br />
                          Date: {batch.date} <br />
                          Time: {batch.time}
                        </div>
                        <a
                          onClick={() => openForm(batch.id)}
                          className="btn btn-success heading"
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
            <h1 className="welcome-home">Welcome to CSE</h1>
            <p className="para">Let's start your learning journey here</p>
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
              style={{ fontFamily: 'Catamaran, sans-serif' }}
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
            <h1 className="text-center mb-5 text-primary heading">Available Courses</h1>
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
                    <h5 className="card-title text-primary heading">
                      {course.courseName}
                    </h5>
                    <p className="card-text para">{course.courseContent}</p>
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
        <section className="py-5" data-aos="fade-up">
          <h3 className="text-center fw-bold mb-5 heading" style={{color:"#004aad"}}>Testimonials</h3>
          <div className="container">
            <div className="row g-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="col-md-4"
                  data-aos="flip-left"
                  data-aos-delay={i * 150}
                >
                  <div className="testimonial-card p-4 h-100 position-relative d-flex">
                    <div className="border-animate"></div>

                    {/* LEFT SIDE */}
                    <div className="text-center me-3 flex-shrink-0">
                      <img
                        src={`public/uploads/${t.imageUrl}`}
                        alt={t.name}
                        className="rounded-circle mb-3 shadow-lg"
                        width="90"
                        height="90"
                        style={{ objectFit: "cover" }}
                      />

                      {/* Table-like details */}
                      <table className="testimonial-table mx-auto text-start">
                        <tbody>
                          <tr>
                            <td className="fw-bold heading">Name:</td>
                            <td className="para">{t.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold heading">Enroll No:</td>
                            <td className="para">{t.enrollno}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold heading">Course:</td>
                            <td className="para">{t.courseName}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MIDDLE LINE */}
                    <div className="divider mx-3"></div>

                    {/* RIGHT SIDE */}
                    <div className="flex-grow-1">
                      <h3 className="heading">Information</h3>
                      <p className="fst-italic text-muted mb-0 para">“{t.text}”</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSS Styling */}
          <style>{`
    .testimonial-card {
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 6px 25px rgba(0,0,0,0.1);
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: flex-start;
    }

    .testimonial-card .border-animate {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 15px;
      padding: 2px;
      background: linear-gradient(270deg, #ff6ec4, #7873f5, #42a5f5, #ff6ec4);
      background-size: 600% 600%;
      animation: borderMove 6s linear infinite;
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
    }

    @keyframes borderMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .divider {
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, #ff6ec4, #7873f5, #42a5f5);
      border-radius: 5px;
      opacity: 0.8;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      transition: all 0.4s ease;
    }

    .testimonial-table {
      font-size: 0.85rem;
      margin-top: 0.5rem;
      width: auto;
    }

    .testimonial-table td {
      padding: 2px 8px;
    }

    .testimonial-table td.fw-bold {
      font-weight: 600;
    }
  `}</style>
        </section>


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
              <h3 className="text-center mb-3 heading">Fees Form</h3>
              <form>
                {/* Name Field */}
                <label className="heading">Name:</label>
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
                    className="para"
                  />
                  {errors.name && (
                    <i
                      className="bi bi-exclamation-circle-fill para"
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
                  <div className="para" style={{ color: "red", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                    {errors.name}
                  </div>
                )}

                {/* Phone Field */}
                <label className="heading">Phone:</label>
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
                    className="para"
                  />
                  {errors.phone && (
                    <i
                      className="bi bi-exclamation-circle-fill para"
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
                  <div className="para" style={{ color: "red", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
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
