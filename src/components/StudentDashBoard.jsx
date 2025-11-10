import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StudentDashBoard = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses] = useState(["Math", "Physics", "Chemistry", "Biology"]);
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [comments, setComments] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText || !selectedCourse) return alert("Select course and write post!");
    const newPost = { id: Date.now(), course: selectedCourse, text: postText };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText) return;
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId] ? [commentText, ...prev[postId]] : [commentText],
    }));
  };

  return (
    <div className="container-fluid p-0">
      {/* Mobile Navbar */}
      <nav className="navbar navbar-dark bg-dark d-md-none">
        <div className="container-fluid">
          <button className="btn btn-dark" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <span className="navbar-brand ms-2 text-success">
            <i className="fas fa-user-graduate me-1"></i>Student Portal
          </span>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white vh-100 p-3 position-fixed top-0 start-0 d-flex flex-column`}
        style={{
          width: "220px",
          zIndex: 1050,
          transform: sidebarOpen || window.innerWidth >= 768 ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <h3 className="text-success mb-4"><i className="fas fa-user-graduate me-2"></i>Student Portal</h3>
        {["Dashboard", "Courses", "Posts", "Profile", "Settings"].map(menu => (
          <button
            key={menu}
            className={`btn btn-dark text-start mb-2 d-flex align-items-center w-100 ${activeMenu === menu ? 'bg-secondary fw-bold' : ''}`}
            onClick={() => { setActiveMenu(menu); setSidebarOpen(false); }}
          >
            {menu === "Dashboard" && <i className="fas fa-tachometer-alt me-2"></i>}
            {menu === "Courses" && <i className="fas fa-book me-2"></i>}
            {menu === "Posts" && <i className="fas fa-edit me-2"></i>}
            {menu === "Profile" && <i className="fas fa-user me-2"></i>}
            {menu === "Settings" && <i className="fas fa-cog me-2"></i>}
            {menu}
          </button>
        ))}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="p-4" style={{ marginLeft: window.innerWidth >= 768 ? "220px" : "0", marginTop: "0" }}>
        <h1 data-aos="fade-down" className="mb-4">{activeMenu}</h1>

        {activeMenu === "Dashboard" && (
          <div data-aos="fade-up">
            <h2>Welcome to your dashboard!</h2>
            <p>Select Courses and check posts here.</p>
          </div>
        )}

        {activeMenu === "Courses" && (
          <div data-aos="fade-up">
            <h3><i className="fas fa-book me-2"></i>Select a Course</h3>
            <select
              className="form-select w-100 mb-3"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {selectedCourse && <p>You selected: <b>{selectedCourse}</b></p>}
          </div>
        )}

        {activeMenu === "Posts" && (
          <div data-aos="fade-up">
            <h3><i className="fas fa-edit me-2"></i>Create Post</h3>
            <form onSubmit={handlePostSubmit} className="d-flex flex-column flex-md-row mb-4 gap-2">
              <select
                className="form-select"
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
              >
                <option value="">-- Select Course --</option>
                {courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                type="text"
                placeholder="Write post..."
                value={postText}
                onChange={e => setPostText(e.target.value)}
                className="form-control"
              />
              <button type="submit" className="btn btn-success">
                <i className="fas fa-paper-plane me-1"></i>Post
              </button>
            </form>

            <h3>Posts</h3>
            {posts.length === 0 && <p>No posts yet.</p>}
            {posts.map(post => (
              <div key={post.id} className="card mb-3 shadow-sm" data-aos="fade-up">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-book me-2"></i>{post.course}</h5>
                  <p className="card-text">{post.text}</p>

                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Add comment..."
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />

                  {comments[post.id] && comments[post.id].length > 0 && (
                    <div>
                      <h6>Comments:</h6>
                      {comments[post.id].map((c, i) => (
                        <p key={i} className="ms-3 text-secondary">- {c}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashBoard;
