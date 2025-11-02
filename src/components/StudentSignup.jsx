import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../index";
const StudentSignup = ({ onClose }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/home");
  };
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });
    setServerError("");
    try {
      const res = await createUser(formData);
      alert("Signup successful!");
      navigate("/home");
    } catch (err) {
      const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          data.split(";").forEach((msg) => {
            msg = msg.trim().toLowerCase();
            if (msg.includes("name")) newErrors.name = msg;
            else if (msg.includes("email")) newErrors.email = msg;
            else if (msg.includes("password") && !msg.includes("confirm"))
              newErrors.password = msg;
            else if (msg.includes("confirm")) newErrors.confirmPassword = msg;
          });
        } else if (status === 409) {
          newErrors.email = "Email already registered. Please try another email.";
        } else {
          setServerError("Something went wrong. Please try again later.");
        }
      } else {
        setServerError("Network error. Please check your connection.");
      }
      setErrors(newErrors);
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
      }}
    >
      <div
        className="panel bg-white p-4 rounded shadow-lg"
        style={{ width: "380px", position: "relative", borderRadius: "15px" }}
      >
        <h2 className="text-primary mb-3">Student Sign Up</h2>
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
          {serverError && (
            <div className="alert alert-danger text-center py-2 mb-2">
              {serverError}
            </div>
          )}

          <input
            type="text"
            className={`form-control mb-1 ${errors.name ? "is-invalid" : ""}`}
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger mb-2">{errors.name}</div>}

          <input
            type="email"
            className={`form-control mb-1 ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

          <input
            type="password"
            className={`form-control mb-1 ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

          <input
            type="password"
            className={`form-control mb-1 ${errors.confirmPassword ? "is-invalid" : ""}`}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-danger mb-2">{errors.confirmPassword}</div>
          )}
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
