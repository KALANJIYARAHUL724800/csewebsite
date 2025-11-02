import React from "react";
import { useNavigate } from "react-router-dom";
const StudentLogin = () => {
  const navigate = useNavigate();
  const handleClose = () => {
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
        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Student ID / Email"
            required
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            required
          />
          <a
            href="/forgot-password"
            className="d-block text-end mb-3 text-decoration-none small text-muted"
          >
            Forgot Password?
          </a>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <div className="signup-link text-center">
            <span className="me-1">Don’t have an account?</span>
            <a href="/signup" className="text-decoration-none">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
