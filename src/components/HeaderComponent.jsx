import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HeaderComponent = () => {
	const [login, setLogin] = useState(() => localStorage.getItem("token"));
	const [userType, setUserType] = useState(
		() => localStorage.getItem("userType") === "true",
	);

	useEffect(() => {
		const interval = setInterval(() => {
			const token = localStorage.getItem("token");
			const user = localStorage.getItem("userType") === "true";
			setUserType(user);
			setLogin(token);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<nav className="navbar navbar-expand-lg header sticky-top">
			<div className="container-fluid d-flex align-items-center justify-content-between">
				{/* All Logos Grouped Left/Center */}
				<div className="d-flex align-items-center gap-2">
					<a className="navbar-brand p-0 m-0" href="home">
						<img src="/cse.jpg" alt="cselogo" className="cse-headinglogo" />
					</a>
					<a className="navbar-brand p-0 m-0">
						<img
							src="/tally-logo.jpeg"
							alt="tally-logo"
							className="tally-logo"
						/>
					</a>
					<a className="navbar-brand p-0 m-0">
						<img
							src="/tally-angeekaram.png"
							alt="tally-angeekaram"
							className="tally-angeekaram"
						/>
					</a>
				</div>

				{/* Mobile Toggle Button (Pushed to Far Right using ms-auto) */}
				<button
					className="navbar-toggler ms-auto d-flex d-lg-none align-items-center gap-1"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					<span className="fw-bold fs-6 text-white">Menu</span>
				</button>

				{/* Navigation Links */}
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" href="/home">
								<i className="bi bi-house-door-fill me-1"></i> Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/about">
								<i className="bi bi-info-circle-fill me-1"></i> About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/courses">
								<i className="bi bi-book-fill me-1"></i> Courses
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/events">
								<i className="bi bi-calendar-event-fill me-1"></i> Events
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/contact">
								<i className="bi bi-telephone-fill me-1"></i> Contact Info
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/gallery">
								<i className="bi bi-image-fill me-1"></i> Gallery
							</a>
						</li>
						<li className="nav-item bg-success rounded">
							<a className="nav-link text-white" href="/view-certificate">
								<i className="bi bi-award-fill me-1"></i> View Certificate
							</a>
						</li>

						{login && userType && (
							<>
								<li className="nav-item">
									<a className="nav-link" href="/dashboard">
										<i className="bi bi-speedometer2 me-1"></i> Dashboard
									</a>
								</li>

								<li
									className="nav-item"
									onClick={() => {
										localStorage.removeItem("token");
										localStorage.removeItem("userType");
										localStorage.removeItem("email");
										window.location.href = "/home";
									}}>
									<a className="nav-link text-danger" href="#">
										<i className="bi bi-box-arrow-right me-1"></i> Logout
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default HeaderComponent;
