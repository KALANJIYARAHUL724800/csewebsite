import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../index";
const ForgotPassword = ({ onClose }) => {
	const [successMessage, setSuccessMessage] = useState("");
	const navigate = useNavigate();
	const [errors, setErrors] = useState({
		email: "",
	});
	const [serverError, setServerError] = useState("");
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const [formData, setFormData] = useState({
		email: "",
	});
	const handleClose = () => {
		if (onClose) onClose();
		navigate("/home");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError("");
		setSuccessMessage("Please wait");
		setErrors({ email: "" });
		try {
			await forgotPassword(formData).then(() => {
				localStorage.setItem("email", formData.email);
			});
			setSuccessMessage("Password reset link sent to your email!");
		} catch (err) {
			const message =
				err.response?.data || "Network error. Please check your connection.";

			if (message.toLowerCase().includes("email")) {
				setErrors({ email: message });
				setSuccessMessage("Email not found try again..");
				formData.email = "";
			} else {
				setSuccessMessage("Please try again..");
				setServerError(message);
				formData.email = "";
			}
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
			}}>
			<div
				className="panel bg-white p-4 rounded shadow-lg"
				style={{ width: "350px", position: "relative", borderRadius: "15px" }}>
				{/* Success message */}
				{successMessage && (
					<div className="alert alert-success text-center py-2 mb-2 heading">
						{successMessage}
					</div>
				)}
				<div className="panel-header d-flex justify-content-between align-items-center mb-3">
					<h2 className="m-0 text-warning heading">Forgot Password</h2>
					<span
						className="close-btn"
						style={{
							fontSize: "1.5rem",
							cursor: "pointer",
							fontWeight: "bold",
							color: "#666",
						}}
						onClick={handleClose}>
						&times;
					</span>
				</div>
				<form onSubmit={handleSubmit}>
					<p className="text-muted small mb-3 para">
						Enter your registered email to receive a password reset link.
					</p>
					<input
						type="email"
						className="form-control mb-3 para"
						placeholder="Enter your email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<div className="text-danger small mb-2 para">{errors.email}</div>
					)}
					{serverError && (
						<div className="text-danger small mb-2">{serverError}</div>
					)}
					<button
						type="submit"
						className="btn btn-warning w-100 mb-3 bi bi-key-fill">
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
