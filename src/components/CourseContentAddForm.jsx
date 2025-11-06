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
    courseTitle: "",
    logoUrl: "",
    whatYouWillLearn: "",
    whoCanJoin: "",
    skillsYouWillGain: "",
    courseTopics: "",
    careerOpportunities: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLatestCourse = async () => {
      try {
        setLoading(true);
        const response = await latestCourse();
        if (response && response.data) {
          setFormData((prev) => ({
            ...prev,
            courseId: response.data.id,
            courseTitle: response.data.courseName,
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
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setSuccess(false);
    navigate("/courses")
    try {
      const payload = {
        ...formData,
        courseId: Number(formData.courseId), // convert to number
      };

      await addCourseContent(payload);

      // Show success popup
      setSuccess(true);

      // Reset form if needed
      // setFormData({...}); // optional
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        alert("Error saving course content!");
      }
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

  const renderInput = (label, name, icon, type = "text", rows = 1) => (
    <div className="mb-3">
      <label className="form-label fw-bold">
        {icon} {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5" style={{ color: "#007bff", fontWeight: "700" }}>
        Add Course Content
      </h2>

      {/* Success popup */}
      {success && (
        <div className="alert alert-success text-center" role="alert">
          Course content saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "800px" }}>
        {renderInput("Course ID", "courseId", <FaIdBadge className="me-2" />, "text")}
        {renderInput("Course Title", "courseTitle", <FaBookOpen className="me-2" />)}
        
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

        {renderInput("Logo URL", "logoUrl", <FaImage className="me-2" />)}
        {renderInput("What You Will Learn", "whatYouWillLearn", <FaLaptopCode className="me-2" />, "textarea", 3)}
        {renderInput("Who Can Join", "whoCanJoin", <FaUserFriends className="me-2" />, "textarea", 2)}
        {renderInput("Skills You Will Gain", "skillsYouWillGain", <FaTools className="me-2" />, "textarea", 2)}
        {renderInput("Course Topics", "courseTopics", <FaListAlt className="me-2" />, "textarea", 2)}
        {renderInput("Career Opportunities", "careerOpportunities", <FaBriefcase className="me-2" />, "textarea", 3)}

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
