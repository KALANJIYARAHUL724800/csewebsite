import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../index";
const StaffsignupComponent = () => {
	const [successMessage, setSuccessMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [serverError, setServerError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		type: false,
	});
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		type: "",
	});
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError("");
		if (formData.password !== formData.confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: "Passwords do not match.",
			}));
			return;
		}
		try {
			const res = await createAdmin(formData);
			setSuccessMessage("Signup successful! Redirecting...");
			setTimeout(() => {
				navigate("/admin");
			}, 1500);
		} catch (err) {
			const newErrors = {
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
				type: "",
			};

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
					newErrors.email =
						"Email already registered. Please try another email.";
				} else {
					setServerError("Something went wrong. Please try again later.");
				}
			} else {
				setServerError("Network error. Please check your connection.");
			}

			setErrors(newErrors);
			setSuccessMessage("");
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
					<h2 className="m-0 text-success heading">Staff Sign Up</h2>
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
					{serverError && (
						<div className="alert alert-danger text-center py-2 mb-2 para">
							{serverError}
						</div>
					)}
					<input
						type="text"
						className="form-control mb-3 para"
						placeholder="Full Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					{errors.name && (
						<div className="text-danger mb-2 para">{errors.name}</div>
					)}
					<input
						type="email"
						className="form-control mb-3 para"
						placeholder="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<div className="text-danger mb-2 para">{errors.email}</div>
					)}
					<div className="position-relative">
						<input
							type={showPassword ? "text" : "password"}
							className="form-control mb-2 para"
							placeholder="Enter Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							minLength={8}
							maxLength={16}
							style={
								errors.password
									? {
											border: "1.5px solid red",
											boxShadow: "0 0 5px rgba(255,0,0,0.5)",
										}
									: {}
							}
						/>

						{/* Eye Icon */}
						<i
							className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: "absolute",
								right: "10px",
								top: "50%",
								transform: "translateY(-50%)",
								cursor: "pointer",
								color: "#555",
								fontSize: "1.2rem",
							}}></i>
					</div>
					{errors.password && (
						<div className="text-danger mb-2 para">{errors.password}</div>
					)}
					<div className="position-relative">
						<input
							type={showPassword ? "text" : "password"}
							className="form-control mb-2 para"
							placeholder="Enter Password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							minLength={8}
							maxLength={16}
							style={
								errors.confirmPassword
									? {
											border: "1.5px solid red",
											boxShadow: "0 0 5px rgba(255,0,0,0.5)",
										}
									: {}
							}
						/>

						{/* Eye Icon */}
						<i
							className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: "absolute",
								right: "10px",
								top: "50%",
								transform: "translateY(-50%)",
								cursor: "pointer",
								color: "#555",
								fontSize: "1.2rem",
							}}></i>
					</div>
					{errors.confirmPassword && (
						<div className="text-danger mb-2 para">
							{errors.confirmPassword}
						</div>
					)}
					<div className="form-check mb-3">
						<label className="form-check-label small" htmlFor="termsCheck">
							<input
								type="checkbox"
								name="type"
								id="termsCheck"
								className="para"
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
						<span className="me-1 para">Already have an account?</span>
						<a
							href="#"
							className="text-decoration-none"
							onClick={() => navigate("/admin")}>
							Login
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default StaffsignupComponent;
