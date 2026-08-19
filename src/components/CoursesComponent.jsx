import React, { useEffect, useState } from "react";
import { getAllCourses, searchCourseContent } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CoursesComponent = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	useEffect(() => {
		AOS.init({ duration: 300, once: true });
		getAllCourses()
			.then((response) => {
				const fetchedCourses = response.data;

				if (!fetchedCourses?.length) {
					navigate("/home");
					return;
				}

				setCourses(fetchedCourses);
			})
			.catch((error) => {
				console.error("Error fetching courses:", error);
				navigate("/home");
			})
			.finally(() => setLoading(false));
	}, [navigate]);
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
			scrollToTop();
		}
	};
	const handlePrev = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
			scrollToTop();
		}
	};
	return (
		<div className="container py-5" id="courses">
			<h1 className="text-center mb-5 heading" style={{ color: "#004aad" }}>
				Available Courses
			</h1>
			<hr />
			{loading ? (
				<div className="text-center my-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden heading">Loading...</span>
					</div>
					<p className="mt-3 heading">Loading courses...</p>
				</div>
			) : (
				<>
					<div className="courses-grid">
						{courses.length > 0 ? (
							courses.map((course, index) => {
								const ribbonColors = ["green", "blue", "red", "purple"];

								return (
									<div key={course.id} data-aos="fade-up">
										<div className="training-card">
											<span
												className={`ribbon ${
													ribbonColors[index % ribbonColors.length]
												}`}>
												FRESHER
											</span>

											<img
												src={
													course.logoUrl || "https://via.placeholder.com/150"
												}
												alt={course.courseName}
												className="course-img"
											/>

											<h5>{course.courseName}</h5>

											<p className="course-content">{course.courseContent}</p>

											<div className="card-footer-custom">
												<span className="duration">
													<i className="fas fa-clock"></i> {course.month}
												</span>

												<a
													href={`/course/${course.id}`}
													className="btn btn-primary btn-sm"
													onClick={() => {
														sessionStorage.setItem("courseId", course.id);
													}}>
													Syllabus
												</a>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<p className="text-center heading">No courses available.</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default CoursesComponent;
