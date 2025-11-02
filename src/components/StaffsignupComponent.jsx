import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../index";
const StaffsignupComponent = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: false,
    });

    // handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        try {
            const res = await createAdmin(formData);
            alert("Signup successful!");
            navigate("/home");
        } catch (err) {
            const newErrors = { name: "", email: "", password: "", confirmPassword: "", type: "" };
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
                    <h2 className="m-0 text-success">Staff Sign Up</h2>
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
                        type="text"
                        className="form-control mb-3"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="text-danger mb-2">{errors.name}</div>}
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="text-danger mb-2">{errors.email}</div>}
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <div className="text-danger mb-2">{errors.password}</div>}
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <div className="text-danger mb-2">{errors.confirmPassword}</div>}
                    <div className="form-check mb-3">
                        <label className="form-check-label small" htmlFor="termsCheck">
                            <input
                                type="checkbox"
                                name="type"
                                id="termsCheck"
                                checked={formData.type}
                                onChange={handleChange}
                                style={{ position: "relative", right: "10px" }}
                                required
                            />
                            I agree to the admin box
                        </label>
                    </div>

                    <button type="submit" className="btn btn-success w-100 mb-3">
                        Sign Up
                    </button>

                    <div className="login-link text-center">
                        <span className="me-1">Already have an account?</span>
                        <a
                            href="#"
                            className="text-decoration-none"
                            onClick={() => navigate("/admin")}
                        >
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffsignupComponent;
