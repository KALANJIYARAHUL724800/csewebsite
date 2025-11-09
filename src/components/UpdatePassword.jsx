import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { updatePassword } from "../index"; 

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleClose = () => {
    navigate("/home");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await updatePassword(formData);
      setSuccess("Password updated successfully!");
      setError("");

      setTimeout(() => navigate("/home"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
      setSuccess("");
    }
  };

  return (
    <div
      className="overlay d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(3px)",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <div
        className="p-4 shadow-lg rounded position-relative"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <h2 className="text-primary mb-3 text-center">Update Password</h2>

        <span
          className="close-btn"
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "1.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#666",
          }}
          onClick={handleClose}
        >
          &times;
        </span>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger text-center py-2 mb-3">{error}</div>
          )}
          {success && (
            <div className="alert alert-success text-center py-2 mb-3">{success}</div>
          )}

          {/* Email Field */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
