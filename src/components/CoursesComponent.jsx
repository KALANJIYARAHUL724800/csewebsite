import React, { useEffect, useState } from "react";
import { getAllCourses } from "../index";
import { useNavigate } from "react-router-dom";

const CoursesComponent = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses()
      .then((response) => {
        const fetchedCourses = response.data;
        const hasValidCourse = fetchedCourses.some(course => course.id > 0);

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

  return (
    <div className="container py-5" id="courses">
      <h1 className="text-center mb-5" style={{color: '#004aad'}}>Available Courses</h1>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading courses...</p>
        </div>
      ) : (
        <div
          className="courses-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="card h-100 shadow-sm text-center">
                <img
                  src={course.logoUrl || "https://via.placeholder.com/150"}
                  className="card-img-top img-fluid mx-auto mt-3"
                  alt={course.courseName}
                  style={{ height: "100px", width: "100px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{course.courseName}</h5>
                  <p className="card-text">{course.courseContent}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-muted">
                      <i className="fas fa-clock"></i> {course.month}
                    </span>
                    <a href={`/course/${course.id}`} className="btn btn-primary btn-sm">
                      Learn More and Fees
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No courses available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesComponent;
