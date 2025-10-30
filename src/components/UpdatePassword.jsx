import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const handleClose = () => {
        navigate("/home");
    };
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            setError("Please fill in both fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setSuccess("Password updated successfully!");
        setError("");
       
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
                className="p-4 shadow-lg rounded"
                style={{
                    width: "380px",
                    background: "rgba(255, 255, 255, 0.85)",
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
                        <div className="alert alert-danger text-center py-2 mb-3">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success text-center py-2 mb-3">
                            {success}
                        </div>
                    )}

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="New Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}

                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}

                    />

                    <button type="submit" className="btn btn-primary w-100">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
