// Modern Student Dashboard (Full Responsive + Attractive UI)
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function StudentDashBoard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const posts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg",
      text: "Today's class summary for Physics!",
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/4145355/pexels-photo-4145355.jpeg",
      text: "Important formulas for Mathematics.",
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/4144093/pexels-photo-4144093.jpeg",
      text: "Chemistry reactions explained!",
    },
  ];

  return (
    <div className="container-fluid p-0 bg-light">

      {/* Mobile Navbar */}
      <nav className="navbar navbar-dark bg-dark d-md-none">
        <div className="container-fluid">
          <button
            className="btn btn-dark"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars fs-4"></i>
          </button>
          <span className="navbar-brand ms-2 text-success fw-bold">
            Student Portal
          </span>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="bg-dark text-white vh-100 p-3 position-fixed top-0 start-0 d-flex flex-column shadow-lg"
        style={{
          width: "240px",
          zIndex: 1050,
          transform:
            window.innerWidth >= 768
              ? "translateX(0)" // Desktop - always visible
              : sidebarOpen
              ? "translateX(0)"
              : "translateX(-100%)",
          transition: "0.4s ease",
        }}
      >
        <h3 className="text-success mb-4 fw-bold">
          <i className="fas fa-graduation-cap me-2"></i>Dashboard
        </h3>

        {[
          { name: "Dashboard", icon: "fa-home" },
          { name: "Courses", icon: "fa-book" },
          { name: "Posts", icon: "fa-image" },
          { name: "Profile", icon: "fa-user" },
          { name: "Settings", icon: "fa-cog" },
        ].map((menu) => (
          <button
            key={menu.name}
            className={`btn btn-dark text-start mb-2 d-flex align-items-center w-100 rounded 
              ${activeMenu === menu.name ? "bg-secondary fw-bold" : ""}`}
            onClick={() => {
              setActiveMenu(menu.name);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <i className={`fas ${menu.icon} me-3`}></i>
            {menu.name}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div
        className="p-4"
        style={{
          marginLeft: window.innerWidth >= 768 ? "240px" : "0",
          transition: "0.3s",
        }}
      >
        <h1 className="fw-bold mb-4">{activeMenu}</h1>

        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && (
          <div className="row g-4" data-aos="fade-up">
            <div className="col-md-4">
              <div className="card shadow p-4 text-center border-0 rounded-4 bg-white">
                <i className="fas fa-book fa-3x text-primary mb-3"></i>
                <h4>Enrolled Courses</h4>
                <p className="text-muted">You are enrolled in 4 active courses</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow p-4 text-center border-0 rounded-4 bg-white">
                <i className="fas fa-bell fa-3x text-warning mb-3"></i>
                <h4>Notifications</h4>
                <p className="text-muted">2 new announcements</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow p-4 text-center border-0 rounded-4 bg-white">
                <i className="fas fa-calendar fa-3x text-success mb-3"></i>
                <h4>Upcoming Exams</h4>
                <p className="text-muted">3 Exams this month</p>
              </div>
            </div>
          </div>
        )}

        {/* POSTS */}
        {activeMenu === "Posts" && (
          <div
            className="w-100"
            style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="card border-0 shadow-lg"
                style={{ height: "100vh", scrollSnapAlign: "start", borderRadius: "0" }}
              >
                {/* IMAGE */}
                <div style={{ height: "60vh" }}>
                  <img
                    src={post.image}
                    className="w-100 h-100"
                    alt="post"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 bg-white" style={{ height: "25vh" }}>
                  <h5 className="fw-bold mb-2">{post.text}</h5>

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i
                      className="far fa-heart fs-4 like-btn"
                      onClick={(e) => {
                        e.target.classList.toggle("fas");
                        e.target.classList.toggle("far");
                        e.target.classList.toggle("text-danger");
                      }}
                    ></i>

                    <i
                      className="far fa-comment fs-4 text-primary comment-btn"
                      data-bs-toggle="collapse"
                      data-bs-target={`#commentBox${post.id}`}
                    ></i>

                    <i className="fas fa-share fs-4 text-success"></i>
                  </div>

                  {/* COMMENT INPUT */}
                  <div id={`commentBox${post.id}`} className="collapse">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="form-control mb-2"
                    />
                    <button className="btn btn-primary w-100">Post Comment</button>
                  </div>

                  <p className="text-muted small">Swipe up for more posts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
