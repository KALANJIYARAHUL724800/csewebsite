import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/home"); // redirect to home when close
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle backend email verification or OTP logic
    alert("Password reset link sent to your email!");
    navigate("/home"); // redirect after submitting
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
          <h2 className="m-0 text-warning">Forgot Password</h2>
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
          <p className="text-muted small mb-3">
            Enter your registered email to receive a password reset link.
          </p>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            required
          />

          <button type="submit" className="btn btn-warning w-100 mb-3">
            Send Reset Link
          </button>

          <div className="back-login text-center">
            <a
              href="#"
              className="text-decoration-none text-secondary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
