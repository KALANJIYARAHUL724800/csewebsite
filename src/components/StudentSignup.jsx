import React from "react";
import { useNavigate } from "react-router-dom";

const StudentSignup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose(); // optional close handler
    navigate("/home"); // navigate to /home
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup logic here (API, validation, etc.)
    alert("Signup successful!");
    navigate("/home"); // redirect after signup
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
        <div className="panel-header d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0 text-primary">Student Sign Up</h2>
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
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Student ID"
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            required
          />

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>

          <div className="login-link text-center">
            <span className="me-1">Already have an account?</span>
            <a href="/login" className="text-decoration-none text-primary">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
