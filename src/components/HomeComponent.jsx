import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { search, showAllBatches, showAllTestimonials, findBatch, insertFeesEnquiry, insertFeesEnquiryTemp, searchCourseContent } from "../index";
import { FaCheckCircle } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
const HomeComponent = () => {
const galleryImages = [
  "/gallery/entrance2.jpg",
  "/gallery/Entrance.jpg",
  "/gallery/Counselling-2.jpg",
  "/gallery/2.jpeg",
  "/gallery/3.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
  "/gallery/7.jpeg",
  "/gallery/8.jpeg"
];
  const [currentImage, setCurrentImage] = useState(0);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const token = sessionStorage.getItem("token");
  const [userLogin, setUserLogin] = useState(!token);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
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
       console.error("Find batch error:", error);

  setErrors(
    error.response?.data || {
      general: "Unable to load batch details"
    }
  );
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
    if (!formData.location) newErrors.location = "Location is required";
    // code here 
    const expiryTime = new Date().getTime() + 60 * 60 * 1000;
    sessionStorage.setItem("token", expiryTime);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSubmit = {
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      courseTitle: formData.course,
    };

    try {
      if (!dataToSubmit.courseTitle) {
        await insertFeesEnquiryTemp(dataToSubmit);
      } else {
        await insertFeesEnquiry(dataToSubmit);
      }

      setShowSuccess(true);
      navigate("/course/"+sessionStorage.getItem("courseId"));
      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        setFormData({ name: "", phone: "", course: "", location: "" });
        closePopup();
      }, 3000);
    } catch (err) {
      const apiErrors = err.response?.data || {};
      setErrors({
        name: apiErrors.name || "",
        phone: apiErrors.phone || "",
        location: apiErrors.location || "",
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
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 6;


const totalPages = Math.ceil(testimonials.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const currentTestimonials = testimonials.slice(
  startIndex,
  startIndex + itemsPerPage
);

const handlePageChange = (page) => {
  setCurrentPage(page);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
    const token = sessionStorage.getItem("token");
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
    if (Array.isArray(response.data)) {
      setTestimonials(response.data);
    } else {
      setTestimonials([]);
    }
  })
  .catch((err) => {
    console.error("Testimonials error:", err);
    setTestimonials([]);
  });
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 2000);

    return () => clearInterval(interval);


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
    //const audio = new Audio("/partyPop/party.mp3");
    //audio.play();
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
            background: `url(${galleryImages[currentImage]}) center/cover no-repeat`,
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

          <div data-aos="" className="heading-content">
            {/* <img src="public/cselogo.png" alt="CSE Logo" style={{ height: "180px" }} /> */}
            <h1 className="display-5 fw-bold mt-4 text-white heading">CSE Computer Education</h1>
            <p className="lead text-light para">Empowering Minds, Shaping Futures</p>
          </div>

        </section>

{/* ================= AVAILABLE BATCHES ================= */}
{hasBatches && (
  <section className="available-batches-section">

    <h3 className="available-batches-title">
      Available Batches
    </h3>

    <div className="batch-location-grid">

      {/* ================= RAMNAD - LEFT ================= */}
      <div className="batch-location-card">

        <div className="batch-location-header">
          <h4>Ramnad</h4>
        </div>

        <div className="batch-table-wrapper">
          <table className="batch-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {batches
                .filter(
                  (batch) =>
                    batch.location?.toLowerCase().trim() === "ramnad"
                )
                .map((batch) => (
                  <tr key={batch.id}>

                    <td>
                      <span className="course-name">
                        {String(batch.course ?? "")
                          .trim()
                          .toUpperCase()}
                      </span>
                    </td>

                    <td>{batch.date}</td>

                    <td>{batch.time}</td>

                    <td>
                      {String(batch.location ?? "")
                        .trim()
                        .toUpperCase()}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => openForm(batch.id)}
                        className="batch-fees-btn"
                      >
                        Join Now
                      </button>
                    </td>

                  </tr>
                ))}
            </tbody>

          </table>
        </div>

      </div>


      {/* ================= UDHUMALPET - RIGHT ================= */}
      <div className="batch-location-card">

        <div className="batch-location-header">
          <h4>Udumalpet</h4>
        </div>

        <div className="batch-table-wrapper">
          <table className="batch-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {batches
                .filter(
                  (batch) =>
                    batch.location?.toLowerCase().trim() === "udumalpet"
                )
                .map((batch) => (
                  <tr key={batch.id}>

                    <td>
                      <span className="course-name">
                        {String(batch.course ?? "")
                          .trim()
                          .toUpperCase()}
                      </span>
                    </td>

                    <td>{batch.date}</td>

                    <td>{batch.time}</td>

                    <td>
                      {String(batch.location ?? "")
                        .trim()
                        .toUpperCase()}
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => openForm(batch.id)}
                        className="batch-fees-btn"
                      >
                        Join Now
                      </button>
                    </td>

                  </tr>
                ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>

  </section>
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
            <img src="/gallery/2.jpeg" alt="Lab" />
            <img src="/gallery/3.jpeg" alt="Lab" />
            <img src="/gallery/4.jpeg" alt="Lab" />
            <img src="/gallery/5.jpeg" alt="Lab" />
            <img src="/gallery/6.jpeg" alt="Lab" />
            <img src="/gallery/7.jpeg" alt="Lab" />
            <img src="/gallery/8.jpeg" alt="Lab" />
          </div>
        </div><br />

        {/* Testimonials Section */}
       {/* ===================== Testimonials Section ===================== */}
<section
  className="py-5 testimonial-section"
  data-aos="fade-up"
>

  {/* ===================== TESTIMONIAL HEADING ===================== */}

  <div className="text-center mb-4">
    <h2 className="heading">
      Student Testimonials
    </h2>

    <p className="para text-muted">
      What our students say about their learning experience
    </p>
  </div>


  {/* ===================== TESTIMONIAL CARDS ===================== */}

  <div className="row g-3 testimonial-row">

    {currentTestimonials?.length > 0 &&
    currentTestimonials.map((t, i) => (

      <div
        key={t.id || i}
        className="col-6 col-md-4 testimonial-col"
        data-aos="flip-left"
        data-aos-delay={i * 150}
      >

        <div className="testimonial-card testimonial-mobile-card h-100 position-relative">

          {/* Animated Border */}
          <div className="border-animate"></div>

          {/* Card Content */}
          <div className="testimonial-card-content">

            {/* ================= LEFT SIDE ================= */}

            <div className="testimonial-left">

              {/* Student Image */}
              <img
                src={`/uploads/${t.imageUrl}`}
                alt={t.name}
                className="rounded-circle shadow-lg testimonial-img"
              />

              {/* Student Details */}
              <table className="testimonial-table testimonial-info-table">
                <tbody>

                  <tr>
                    <td className="fw-bold heading">
                      Enroll No:
                    </td>

                    <td className="para text-dark">
                      {t.enrollno}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-bold heading">
                      Course:
                    </td>

                    <td className="para text-dark">
                      {t.courseName}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-bold heading text-dark">
                      Place:
                    </td>

                    <td className="para text-dark">
                      {t.place}
                    </td>
                  </tr>

                </tbody>
              </table>

            </div>


            {/* ================= DIVIDER ================= */}

            <div className="divider"></div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="testimonial-right">

              <h3 className="heading testimonial-name">
                {t.name} Says
              </h3>

              <p className="fst-italic text-dark mb-0 para testimonial-message">
                “{t.text}”
              </p>

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

  {/* ===================== PAGINATION ===================== */}

{totalPages > 1 && (

  <div className="testimonial-pagination-wrapper">

    <nav aria-label="Testimonials pagination">

      <ul className="pagination testimonial-pagination mb-0">

        {/* ================= PREVIOUS ================= */}

        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >

          <button
            type="button"
            className="page-link"
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
            aria-label="Previous page"
          >
            <i className="bi bi-chevron-left"></i>
            <span>Previous</span>
          </button>

        </li>


        {/* ================= NEXT ================= */}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >

          <button
            type="button"
            className="page-link"
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
            aria-label="Next page"
          >
            <span>Next</span>
            <i className="bi bi-chevron-right"></i>
          </button>

        </li>

      </ul>

    </nav>

  </div>

)}

</section>



        {/* Show Form */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              boxSizing: "border-box",
              overflow: "hidden",
              backgroundColor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(5px)",
              zIndex: 999,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                width: "100%",
                maxWidth: "500px",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              <h3 className="text-center mb-3 heading">Enquiry Form</h3>
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setShowForm(false);
                }}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "transparent",
                  border: "none",
                  color: "red",
                  fontSize: "28px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  lineHeight: "1",
                }}
              >
                &times;
              </button>
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
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>

                  <select
                    className="form-select"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  >
                    <option value="">-- Select Location --</option>
                    <option value="RAMNAD">RAMNAD</option>
                    <option value="UDUMALPET">UDUMALPET</option>
                    <option value="KEELAKARAI">KEELAKARAI</option>
                  </select>

                  {errors.location && (
                    <div className="para" style={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.location}
                    </div>
                  )}
                </div>
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
