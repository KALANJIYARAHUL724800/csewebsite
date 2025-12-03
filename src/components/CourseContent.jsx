import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheckCircle } from 'react-icons/fa';
import {
  FaLaptopCode,
  FaBookOpen,
  FaUserFriends,
  FaTools,
  FaListAlt,
  FaBriefcase,
  FaDollarSign
} from 'react-icons/fa';
import { searchCourseContent, insertFeesEnquiry } from "../index";
import { useNavigate } from "react-router-dom";
const CourseContent = () => {
  const [errors, setErrors] = useState({ name: "", phone: "" });
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    currentDate: "",
    currentTime: ""
  });

  useEffect(() => {
    searchCourseContent(id)
      .then(res => {
        const data = res.data.courseId ? { ...res.data.courseId, ...res.data } : res.data;
        setCourseData(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading course...</p>;
  if (!courseData) return navigate("/courses");

  const courseSections = [
    { icon: <FaBookOpen size={30} />, title: "Course Title", text: courseData.courseName || courseData.courseTitle },
    { icon: <FaLaptopCode size={30} />, title: "What You Will Learn", text: courseData.whatYouWillLearn },
    { icon: <FaUserFriends size={30} />, title: "Who Can Join", text: courseData.whoCanJoin },
    { icon: <FaTools size={30} />, title: "Skills You Will Gain", text: courseData.skillsYouWillGain },
    { icon: <FaListAlt size={30} />, title: "Course Topics", text: courseData.courseTopics },
    { icon: <FaBriefcase size={30} />, title: "Career Opportunities", text: courseData.careerOpportunities }
  ];

  const images = courseData.logoUrl ? [courseData.logoUrl] : ["https://via.placeholder.com/400x200"];

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await searchCourseContent(id);
      const courseData = res.data.courseId ? { ...res.data.courseId, ...res.data } : res.data;
      const payload = {
        name: formData.name,
        phone: formData.phone,
        courseId: courseData._id || courseData.courseId,
        courseTitle: courseData.courseName || courseData.courseTitle,
        date: formData.date,
        time: formData.time
      };
      await insertFeesEnquiry(payload);
      setShowForm(false);
      setShowSuccess(true);
      setFormData({ name: "", phone: "", date: "", time: "" });
      setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        const message = error.response.data;
        const newErrors = {};

        if (message.toLowerCase().includes("name")) {
          newErrors.name = message.split(";").find(m => m.toLowerCase().includes("name"))?.trim();
        }
        if (message.toLowerCase().includes("phone")) {
          newErrors.phone = message.split(";").find(m => m.toLowerCase().includes("phone"))?.trim();
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    }
  };


  const openForm = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    setFormData(prev => ({
      ...prev,
      currentDate: date,
      currentTime: time
    }));
    setShowForm(true);
  };

  return (
    <div className="container my-5">
      {/* Heading with Fees Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
        <h1
          className="text-center flex-grow-1 mb-3 mb-md-0 heading"
          style={{ fontWeight: 700, color: "#007bff", fontFamily: "Poppins, sans-serif" }}
        >
          {courseData.courseName || "Course"}
        </h1>
        <button
          className="btn btn-success d-flex align-items-center"
          style={{ gap: "0.5rem" }}
          onClick={openForm}
        >
          <FaDollarSign /> Fees
        </button>
      </div>

      {/* Course Image */}
      <div className="d-flex justify-content-center mb-5 flex-wrap">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Course ${idx + 1}`}
            className="img-fluid rounded shadow mb-3"
            style={{ maxHeight: "250px", marginRight: "10px" }}
          />
        ))}
      </div>

      {/* Course Sections */}
      <div className="row g-4">
        {courseSections.map((section, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-lg-4">
            <div
              className="p-4 text-center rounded shadow h-100"
              style={{
                background: "linear-gradient(145deg, #e0f7fa, #fff)",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <div className="mb-3" style={{ color: "#007bff" }}>{section.icon}</div>
              <h5 className="mb-2 fw-bold heading">{section.title}</h5>
              <p className="mb-0 para">
                {section.text || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fees Popup Form */}
      {showForm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ minWidth: "300px", maxWidth: "400px" }}>
            <h5 className="mb-3 heading">Enter Your Details</h5>
            <form onSubmit={handleFormSubmit}>
              <input type="hidden" name="currentDate" value={formData.currentDate} />
              <input type="hidden" name="currentTime" value={formData.currentTime} />

              <div className="mb-2">
                <input
                  type="text"
                  name="name"
                  className="form-control para"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
                {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  name="phone"
                  className="form-control para"
                  placeholder="Phone Number"
                  value={formData.phone}
                  maxLength={10}
                  onChange={handleFormChange} 
                />
                 {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
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
            <h5 className="mb-2 heading">Thank you so much!</h5>
            <p className="para">Our staff will contact you shortly regarding the fees.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
