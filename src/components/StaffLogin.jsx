import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../index";

const StaffLogin = ({ onClose }) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setErrors({ email: "", password: "" });
    try {
      const res = await loginAdmin(formData);
      const expiryTime = new Date().getTime() + 60 * 60 * 1000; 
      localStorage.setItem("token", expiryTime);
      alert("Login successful!");
      navigate("/dashboard", { state: { user: res.data } });
    } catch (err) {
      const newErrors = { email: "", password: "" };
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          data.split(";").forEach((msg) => {
            msg = msg.trim().toLowerCase();
            if (msg.includes("email")) newErrors.email = msg;
            else if (msg.includes("password")) newErrors.password = msg;
          });
        } else {
          setServerError("Something went wrong. Please try again later.");
        }
      } else {
        setServerError("Network error. Please check your connection.");
      }
      setErrors(newErrors);
    }
  };
  const handleClose = () => {
    if (onClose) onClose();
    navigate("/home");
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
        style={{ width: "350px", position: "relative", borderRadius: "15px" }}
      >
        <div className="panel-header d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0 text-success">Admin Login</h2>
          <span
            className="close-btn"
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#666",
            }}
            onClick={handleClose}
          >
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {serverError && (
            <div className="alert alert-danger text-center py-2 mb-2">
              {serverError}
            </div>
          )}

          <input
            type="email"
            className="form-control mb-2"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger mb-2">{errors.password}</div>
          )}

          <a
            href="/forgot-password"
            className="d-block text-end mb-3 text-decoration-none small text-muted"
          >
            Forgot Password?
          </a>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
