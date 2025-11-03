import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaLaptopCode,
  FaBookOpen,
  FaUserFriends,
  FaTools,
  FaListAlt,
  FaBriefcase,
  FaIdBadge,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { searchCourseContent, addCourseContent } from "../index";

const CourseContentForm = () => {
  const location = useLocation();
  const { courseId } = location.state || {};

  const [formData, setFormData] = useState({
    courseId: "",
    courseTitle: "",
    whatYouWillLearn: "",
    whoCanJoin: "",
    skillsYouWillGain: "",
    courseTopics: "",
    careerOpportunities: "",
  });

  // Fetch course content by ID
  useEffect(() => {
    if (courseId) {
      searchCourseContent(courseId)
        .then((res) => {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            courseId: data.id || courseId,
            courseTitle: data.courseName || "",
          }));
        })
        .catch((err) => console.error("Error fetching content:", err));
    }
  }, [courseId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourseContent(formData);
      alert("Course content saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving course content!");
    }
  };

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-5"
        style={{ color: "#007bff", fontWeight: "700" }}
      >
        Edit Course Content
      </h2>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px" }}>
        {/* Course ID */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaIdBadge className="me-2" /> Course ID
          </label>
          <input
            type="text"
            className="form-control"
            name="courseId"
            value={formData.courseId}
            readOnly
          />
        </div>

        {/* Course Title */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaBookOpen className="me-2" /> Course Title
          </label>
          <input
            type="text"
            className="form-control"
            name="courseTitle"
            value={formData.courseTitle}
            readOnly
          />
        </div>

        {/* What You Will Learn */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaLaptopCode className="me-2" /> What You Will Learn
          </label>
          <textarea
            className="form-control"
            name="whatYouWillLearn"
            value={formData.whatYouWillLearn}
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Who Can Join */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaUserFriends className="me-2" /> Who Can Join
          </label>
          <textarea
            className="form-control"
            name="whoCanJoin"
            value={formData.whoCanJoin}
            onChange={handleChange}
            rows="2"
          />
        </div>

        {/* Skills You Will Gain */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaTools className="me-2" /> Skills You Will Gain
          </label>
          <textarea
            className="form-control"
            name="skillsYouWillGain"
            value={formData.skillsYouWillGain}
            onChange={handleChange}
            rows="2"
          />
        </div>

        {/* Course Topics */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaListAlt className="me-2" /> Course Topics
          </label>
          <textarea
            className="form-control"
            name="courseTopics"
            value={formData.courseTopics}
            onChange={handleChange}
            rows="2"
          />
        </div>

        {/* Career Opportunities */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaBriefcase className="me-2" /> Career Opportunities
          </label>
          <textarea
            className="form-control"
            name="careerOpportunities"
            value={formData.careerOpportunities}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContentForm;
