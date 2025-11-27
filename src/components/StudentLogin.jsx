import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../index";
const StudentLogin = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/home")
  };

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");

    try {
      const res = await loginUser(formData);
      const expiryTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("token", expiryTime);
      localStorage.setItem("userType",res.data.userType);
      localStorage.setItem("email", res.data.email);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/student-dashboard", { state: { user: res.data } });
      }, 1500);

    } catch (err) {
      const newErrors = { email: "", password: "" };
      if (err.response) {
        const { data, status } = err.response;
        if (status === 400) {
          const errorText = typeof data === "string" ? data : Object.values(data).join("; ");
          errorText.split(";").forEach((msg) => {
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
          <h2 className="m-0 text-primary">Student Login</h2>
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
          {/* Server error */}
          {serverError && (
            <div className="alert alert-danger text-center py-2 mb-2">
              {serverError}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="alert alert-success text-center py-2 mb-2">
              {successMessage}
            </div>
          )}

          {/* Email input */}
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={errors.email ? { border: "1.5px solid red", boxShadow: "0 0 5px rgba(255,0,0,0.5)" } : {}}
          />

          {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

          {/* Password input */}
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            maxLength={16}
            style={errors.password ? { border: "1.5px solid red", boxShadow: "0 0 5px rgba(255,0,0,0.5)" } : {}}
          />

          {errors.password && (
            <div className="text-danger mb-2">{errors.password}</div>
          )}
          <a
            href="/signup"
            className="d-block text-end mb-3 text-decoration-none small text-muted"
          >
             <i class="bi bi-person-plus"></i> Sign Up Signup Here
          </a>
          <a
            href="/forgot-password"
            className="d-block text-end mb-3 text-decoration-none small text-muted"
          >
            <i class="bi bi-key"></i> Forgot Password?
          </a>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
