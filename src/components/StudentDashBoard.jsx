import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { showAllPosts, updateLikes, getTotalLikes, getAllCourses } from "../index";
import { useNavigate } from "react-router-dom";

export default function StudentDashBoard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await showAllPosts();
        const postsWithLikes = await Promise.all(
          res.data.map(async (p) => {
            const likesRes = await getTotalLikes(p.id);
            return { ...p, liked: false, likes: likesRes.data };
          })
        );
        setPosts(postsWithLikes);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchPosts();
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
  }, []);

  const toggleLike = (id) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    const newLiked = !post.liked;
    const newLikesCount = newLiked ? post.likes + 1 : post.likes - 1;
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, liked: newLiked, likes: newLikesCount } : p
      )
    );
    updateLikes(id, { likes: newLikesCount })
      .then((res) => { })
      .catch((err) => {
        setPosts(prev =>
          prev.map(p =>
            p.id === id ? { ...p, liked: post.liked, likes: post.likes } : p
          )
        );
      });
  };

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
              ? "translateX(0)"
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
            className={`btn btn-dark text-start mb-2 d-flex align-items-center w-100 rounded ${activeMenu === menu.name ? "bg-secondary fw-bold" : ""
              }`}
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

        {/* Courses */}
        {activeMenu === "Courses" && (
          <div className="container py-5" id="courses">
            <h1 className="text-center mb-5" style={{ color: "#004aad" }}>
              Available Courses
            </h1>
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading courses...</p>
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
        )}
        {/* POSTS */}
        {activeMenu === "Posts" && (
          <div
            className="w-100"
            style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}
          >
            {!posts.length ? (
              <h3 className="text-center mt-5">Loading posts...</h3>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="card border-0 shadow-lg"
                  style={{ height: "100vh", scrollSnapAlign: "start", borderRadius: "0" }}
                >
                  <div style={{ height: "60vh" }}>
                    <img
                      src={`/posts/${post.imageUrl}`}
                      className="w-100 h-100 post-image"
                      alt="post"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="p-4 bg-white" style={{ height: "25vh" }}>
                    <h5 className="fw-bold mb-2">{post.title}</h5>

                    <div className="d-flex align-items-center gap-3 mb-3">
                      <i
                        className={`fs-4 like-btn ${post.liked ? "fas text-danger" : "far"} fa-heart`}
                        onClick={() => toggleLike(post.id)}
                      ></i>
                      <span>{post.likes}</span>

                      <i
                        className="far fa-comment fs-4 text-primary comment-btn"
                        data-bs-toggle="collapse"
                        data-bs-target={`#commentBox${post.id}`}
                      ></i>

                      <i className="fas fa-share fs-4 text-success"></i>
                    </div>

                    <div id={`commentBox${post.id}`} className="collapse">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="form-control mb-2"
                        value={commentText[post.id] || ""}
                        onChange={(e) =>
                          setCommentText({ ...commentText, [post.id]: e.target.value })
                        }
                      />

                      <button
                        className="btn btn-primary w-100"
                        onClick={() => setCommentText({ ...commentText, [post.id]: "" })}
                      >
                        Post Comment
                      </button>
                    </div>

                    <p className="text-muted small">Swipe up for more posts</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
