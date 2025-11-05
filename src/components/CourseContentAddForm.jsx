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
  FaImage,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addCourseContent, latestCourse } from "../index";

const CourseContentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    logoUrl: "",
    whatYouWillLearn: "",
    whoCanJoin: "",
    skillsYouWillGain: "",
    courseTopics: "",
    careerOpportunities: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLatestCourse = async () => {
      try {
        setLoading(true);
        const response = await latestCourse();
        if (response && response.data) {
          setFormData((prev) => ({
            ...prev,
            courseId: response.data.id,
            courseName: response.data.courseName,
            logoUrl: response.data.logoUrl,
          }));
        }
      } catch (err) {
        console.error("Error fetching latest course:", err);
        alert("Failed to fetch latest course.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCourse();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log(formData)
      await addCourseContent(formData);
      alert("Course content saved successfully!");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      alert("Error saving course content!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <h4>Loading latest course...</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5" style={{ color: "#007bff", fontWeight: "700" }}>
        Add Course Content
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
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Course Logo */}
        {formData.logoUrl && (
          <div className="mb-3 text-center">
            <label className="form-label fw-bold">
              <FaImage className="me-2" /> Course Logo
            </label>
            <div>
              <img
                src={formData.logoUrl}
                alt="Course Logo"
                style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
              />
            </div>
          </div>
        )}

        {/* Optionally allow editing logo URL */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            <FaImage className="me-2" /> Logo URL
          </label>
          <input
            type="text"
            className="form-control"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
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
            required
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
          <button type="submit" className="btn btn-primary px-5" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContentForm;
