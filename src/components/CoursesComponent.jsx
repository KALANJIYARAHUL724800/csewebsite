import React, { useEffect, useState } from "react";
import { getAllCourses } from "../index";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CoursesComponent = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    getAllCourses()
      .then((response) => {
        const fetchedCourses = response.data;
        const hasValidCourse = fetchedCourses.some((course) => course.id > 0);
        if (!hasValidCourse) {
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
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);
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
          <div
            className="courses-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="card h-100 shadow-sm text-center"
                  data-aos="fade-up"
                >
                  <img
                    src={course.logoUrl || "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid mx-auto mt-3"
                    alt={course.courseName}
                    style={{ height: "100px", width: "100px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary heading">{course.courseName}</h5>
                    <p className="card-text para">{course.courseContent}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="text-muted">
                        <i className="fas fa-clock para"></i> {course.month}
                      </span>
                      <a href={`/course/${course.id}`} className="btn btn-primary btn-sm">
                        Learn More and Fees
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center heading">No courses available.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4 gap-2">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesComponent;
