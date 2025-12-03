import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { logout, showAllPosts, updateLikes, getTotalLikes, getAllCourses, downloadCoursePdf, insertComment, moveImage, updateUserRecord, getEmailData } from "../index";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function StudentDashBoard() {
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const saveProfile = async () => {
    if (!imageFile) return;
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("gender", gender);
    data.append("bio", bio);
    data.append("dob", dob);
    data.append("address", address);
    data.append("profile", imageFile);
    const formObject = Object.fromEntries(data.entries());
    formObject.imageUrl = imageFile.name;
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await moveImage(formData, "profile");
      await updateUserRecord(localStorage.getItem("email"), formObject).then((res) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }).catch((err) => {
        setErrors(err)
      })
      setProfileImage(URL.createObjectURL(imageFile));
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "Something went wrong" });
      }
    }
  };

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
    }
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    getEmailData(email).then((res) => {
      const data = res.data;
      setName(data.name);
      setEmail(data.email);
      setPhone(data.mobile);
      setGender(data.gender);
      setBio(data.bio);
      setDob(data.dob);
      setAddress(data.address);
      setImageFile(data.profile);
    })
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
      .catch(() => navigate("/home"))
      .finally(() => setLoading(false));
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleCommentPost = async (postId) => {
    try {
      const payload = {
        comments: commentText[postId],
        likes: 0
      };
      const res = await insertComment(postId, payload);
      setPosts(prevPosts =>
        prevPosts.map(p =>
          p.id === postId
            ? { ...p, comments: [...(p.comments || []), res.data] }
            : p
        )
      );
      setCommentText({ ...commentText, [postId]: "" });
    } catch (error) {
    }
  };
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

  const downloadPdf = async (e, id) => {
    e.preventDefault();
    try {
      const response = await downloadCoursePdf(id);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `course_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
    }
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
          <span className="navbar-brand ms-2 text-success fw-bold heading">
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
        <h3 className="text-success mb-4 fw-bold heading">
          <i className="fas fa-graduation-cap me-2"></i>Dashboard
        </h3>
        {[
          { name: "Dashboard", icon: "fa-home" },
          { name: "Courses", icon: "fa-book" },
          { name: "Posts", icon: "fa-image" },
          { name: "Profile", icon: "fa-user" },
          { name: "Settings", icon: "fas fa-cog me-2" },
        ].map((menu) => (
          <button
            key={menu.name}
            className={`btn btn-dark text-start mb-2 d-flex align-items-center w-100 rounded heading ${activeMenu === menu.name ? "bg-secondary fw-bold" : ""
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
        <h1 className="fw-bold mb-4 heading">{activeMenu}</h1>
        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && (
          <div className="position-relative bg-white p-4 rounded-4 shadow-sm">

            {/* Profile image positioned absolute at top-left */}
            <img
              src={
                profileImage
                  ? profileImage
                  : imageFile
                    ? `/profile/${imageFile}`
                    : "https://via.placeholder.com/150"
              }
              alt="profile"
              className="rounded-circle position-absolute top-0 start-0 m-3"
              style={{ width: "60px", height: "60px", objectFit: "cover", zIndex: 10 }}
            />  {name && (
              <h3 className="ms-5 heading" style={{ position: "relative", left: "10px", marginTop: "3px", color: "grey" }}>
                <i> Welcome {name} </i>
              </h3>
            )}

            {/* Add margin-top to move row down below image */}
            <div className="row g-4 mt-5">
              <div className="col-md-4">
                <div className="card shadow p-4 text-center border-0 rounded-4">
                  <i className="fas fa-book fa-3x text-primary mb-3"></i>
                  <h4 className="heading">Enrolled Courses</h4>
                  <p className="text-muted para">You are enrolled in 4 active courses</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow p-4 text-center border-0 rounded-4">
                  <i className="fas fa-bell fa-3x text-warning mb-3"></i>
                  <h4 className="heading">Notifications</h4>
                  <p className="text-muted para">2 new announcements</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow p-4 text-center border-0 rounded-4">
                  <i className="fas fa-calendar fa-3x text-success mb-3"></i>
                  <h4 className="heading">Upcoming Exams</h4>
                  <p className="text-muted para">3 Exams this month</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses */}
        {activeMenu === "Courses" && (
          <div className="container py-5" id="courses">
            <h1 className="text-center mb-5 heading" style={{ color: "#004aad" }}>
              Available Courses
            </h1>
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
                              <i className="fas fa-clock"></i> {course.month}
                            </span>
                            <button
                              onClick={(e) => downloadPdf(e, course.id)}
                              className="btn btn-success btn-sm"
                            >
                              <i className="bi bi-download"></i> Download Syllabus
                            </button>

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
        )}
        {/* POSTS */}
        {activeMenu === "Posts" && (
          <div
            className="w-100"
            style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}
          >
            {!posts.length ? (
              <h3 className="text-center mt-5 heading">Loading posts...</h3>
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
                    <h5 className="fw-bold mb-2 heading">{post.title}</h5>

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
                        className="form-control mb-2 para"
                        value={commentText[post.id] || ""}
                        onChange={(e) =>
                          setCommentText({ ...commentText, [post.id]: e.target.value })
                        }
                      />

                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleCommentPost(post.id)}
                      >
                        Post Comment
                      </button>
                    </div>

                    <p className="text-muted small para">Swipe up for more posts</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* PROFILE */}
        {activeMenu === "Profile" && (
          <div className="container mt-4">
            <div className="row justify-content-center">

              {/* LEFT SIDE – PROFILE IMAGE UPLOAD */}
              <div className="col-md-4">
                <div className="card shadow-sm text-center p-3">
                  <img
                    src={
                      profileImage
                        ? profileImage
                        : imageFile
                          ? `/profile/${imageFile}`
                          : "https://via.placeholder.com/150"
                    }
                    alt="profile"
                    className="rounded-circle mb-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <input
                    type="file"
                    className="heading"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      setProfileImage(URL.createObjectURL(file));
                      setImageFile(file);
                    }}
                  />
                  <small className="text-muted para">Upload Profile Picture</small>
                  {errors.image && <div className="text-danger mt-1">{errors.image}</div>}
                </div>
              </div>

              {/* RIGHT SIDE – PROFILE FIELDS */}
              <div className="col-md-8">
                <div className="card shadow-sm p-4">
                  <h4 className="mb-3 heading">Profile Details</h4>
                  <div className="row">

                    {/* Full Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Full Name</label>
                      <input
                        type="text"
                        className={`form-control para ${errors.name ? "is-invalid" : ""}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Email</label>
                      <input
                        type="email"
                        className={`form-control para ${errors.email ? "is-invalid" : ""}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Phone</label>
                      <input
                        type="number"
                        className={`form-control para ${errors.phone ? "is-invalid" : ""}`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* Gender */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Gender</label>
                      <select
                        className={`form-select para ${errors.gender ? "is-invalid" : ""}`}
                        value={gender ?? ""}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Choose</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                      {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>

                    {/* Bio */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label heading">Bio</label>
                      <textarea
                        className={`form-control para ${errors.bio ? "is-invalid" : ""}`}
                        rows="3"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write something about yourself..."
                      />
                      {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                    </div>

                    {/* Date of Birth */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Date of Birth</label>
                      <input
                        type="date"
                        className={`form-control para ${errors.dob ? "is-invalid" : ""}`}
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                      {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                    </div>

                    {/* Address */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label heading">Address</label>
                      <input
                        type="text"
                        className={`form-control para ${errors.address ? "is-invalid" : ""}`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                  </div>

                  {/* SAVE BUTTON */}
                  <button className="btn btn-primary w-100" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
        {activeMenu === "Settings" && (
          <div className="container mt-4">
            {/* Profile Settings */}
            <div className="card mb-4 p-3 shadow-sm">
              <h5 className="mb-3"><i className="fas fa-user me-2"></i>Profile Settings</h5>
              <div className="d-flex flex-column flex-md-row gap-2">
                <button className="btn btn-primary flex-fill" onClick={() => navigate("/update-password")}>
                  <i className="fas fa-key me-2"></i>Change Password
                </button>
                <button className="btn btn-secondary flex-fill" onClick={() => setActiveMenu("Profile")}>
                  <i className="fas fa-user-edit me-2"></i>Update Profile Info
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card mb-4 p-3 shadow-sm">
              <h5 className="mb-3"><i className="fas fa-bell me-2"></i>Notification Settings</h5>
              <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" id="emailNotif" />
                <label className="form-check-label" htmlFor="emailNotif">
                  <i className="fas fa-envelope me-2"></i>Email Notifications
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="pushNotif" />
                <label className="form-check-label" htmlFor="pushNotif">
                  <i className="fas fa-bell-on me-2"></i>Push Notifications
                </label>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="card mb-4 p-3 shadow-sm">
              <h5 className="mb-3"><i className="fas fa-user-shield me-2"></i>Privacy Settings</h5>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="profileVisibility" />
                <label className="form-check-label" htmlFor="profileVisibility">
                  <i className="fas fa-eye-slash me-2"></i>Make Profile Private
                </label>
              </div>
            </div>

            {/* Account Settings */}
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3"><i className="fas fa-user-cog me-2"></i>Account</h5>
              <button className="btn btn-danger w-100" onClick={logout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout Account
              </button>
            </div>
          </div>
        )}

        {showSuccess && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          >
            <div className="bg-white p-4 rounded shadow text-center" style={{ minWidth: "300px", maxWidth: "400px" }}>
              <FaCheckCircle size={50} style={{ color: 'green', marginBottom: '15px' }} />
              <h5 className="mb-2">Successfully Profile Updated!</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
