import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const DashboardComponent = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-3 rounded">
          <h5>Navigation</h5>
          <ul className="list-unstyled">
            <li>
              <button
                className="btn btn-link"
                onClick={() => navigate("/addcourse")}
              >
                Add Course
              </button>
            </li>
            <li>
              <button
                className="btn btn-link"
                onClick={() => navigate("/course")}
              >
                View Courses
              </button>
            </li>
            <li>
              <button
                className="btn btn-link"
                onClick={() => navigate("/progress")}
              >
                Student Progress
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-3">
          <h4>Welcome, Admin!</h4>
          <p>Here you can manage courses, view student progress, and more.</p>

          {/* Example metrics */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h5>Total Students</h5>
                <p>120</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h5>Total Courses</h5>
                <p>15</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center p-3">
                <h5>Active Staff</h5>
                <p>5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
