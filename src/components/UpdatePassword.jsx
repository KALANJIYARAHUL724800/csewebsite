import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { updatePassword } from "../index.js";

const UpdatePassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleClose = () => {
		const userType = localStorage.getItem("userType") === "true";
		const email = localStorage.getItem("email");

		if (email && !userType) navigate("/student-dashboard");
		else if (email && userType) navigate("/dashboard");
		else navigate("/home");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setError("");
		setSuccess("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError("");
		setSuccess("");

		if (!formData.email || !formData.password || !formData.confirmPassword) {
			setError("Please fill in all fields.");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		if (formData.password.length < 8 || formData.password.length > 16) {
			setError("Password must be between 8 and 16 characters.");
			return;
		}

		try {
			const response = await updatePassword({
				email: formData.email,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			});

			setSuccess(response.data?.message || "Password updated successfully.");

			setError("");

			setTimeout(() => {
				localStorage.clear();
				localStorage.removeItem("token");
				localStorage.removeItem("userType");
				localStorage.removeItem("email");

				navigate("/login", { replace: true });
			}, 2000);
		} catch (err) {
			console.error("Password update error:", err);

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
			}}>
			<div
				className="p-4 shadow-lg rounded position-relative"
				style={{
					maxWidth: "400px",
					width: "100%",
					background: "rgba(255, 255, 255, 0.95)",
					borderRadius: "15px",
					backdropFilter: "blur(8px)",
					WebkitBackdropFilter: "blur(8px)",
				}}>
				<h2 className="mb-3 text-center heading" style={{ color: "#004aad" }}>
					Update Password
				</h2>

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
					onClick={handleClose}>
					&times;
				</span>

				<form onSubmit={handleSubmit}>
					{error && (
						<div className="alert alert-danger text-center py-2 mb-3 para">
							{error}
						</div>
					)}
					{success && (
						<div className="alert alert-success text-center py-2 mb-3 para">
							{success}
						</div>
					)}

					{/* Email Field */}
					<div className="input-group mb-3">
						<span className="input-group-text">
							<i className="bi bi-envelope"></i>
						</span>
						<input
							type="email"
							className="form-control para"
							placeholder="Enter your Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>

					{/* Password Field */}
					<div className="input-group mb-3 position-relative">
						<span className="input-group-text">
							<i className="bi bi-lock"></i>
						</span>
						<input
							type={showPassword ? "text" : "password"}
							className="form-control mb-2 para"
							placeholder="Enter Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							minLength={8}
							maxLength={16}
						/>
						<i
							className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: "absolute",
								right: "15px",
								top: "50%",
								transform: "translateY(-50%)",
								cursor: "pointer",
								fontSize: "1.2rem",
								color: "#555",
							}}></i>
					</div>

					{/* Confirm Password Field */}
					<div className="input-group mb-3 position-relative">
						<span className="input-group-text">
							<i className="bi bi-lock-fill"></i>
						</span>
						<input
							type={showPassword ? "text" : "password"}
							className="form-control mb-2 para"
							placeholder="Confirm Password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							minLength={8}
							maxLength={16}
						/>
						<i
							className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: "absolute",
								right: "15px",
								top: "50%",
								transform: "translateY(-50%)",
								cursor: "pointer",
								fontSize: "1.2rem",
								color: "#555",
							}}></i>
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
