import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  enquiryCountNotification,
  courseCount,
  countAdmin,
  countStudents,
  moveImage,
  insertPost
} from "../index";
import {
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineLineChart,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaUpload } from "react-icons/fa";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notificationCount, setNotificationCount] = useState(null);
  const [courseCounts, SetCourseCount] = useState(null);
  const [adminCount, SetAdminCount] = useState(null);
  const [studentsCount, SetStudentsCount] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  function uploadPosts() {
    setShowForm(true);
  }
  function closeForm() {
    setShowForm(false);
    setFile(null);
    setTitle("");
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("image", file);
    moveImage(formData, "post")
      .then((res) => {
        console.log("Image Uploaded:", res);
        const imageUrl = res.filename || res.data || file.name;
        const postData = {
          title: title,
          imageUrl: imageUrl
        };

        return insertPost(postData);
      })
      .then((res) => {
        console.log("Post Inserted:", res.data);
        alert("Post added successfully!");
        closeForm();
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed!");
      });
  }
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
    countStudents()
      .then((res) => {
        if (res.data == 0) {
          SetStudentsCount(null)
        } else if (res.data == null) {
          SetStudentsCount(null)
        }
        SetStudentsCount(res.data)
      })
      .catch((err) => console.error(err));

    countAdmin()
      .then((res) => SetAdminCount(res.data))
      .catch((err) => console.error(err));

    courseCount()
      .then((res) => SetCourseCount(res.data))
      .catch((err) => console.error(err));

    enquiryCountNotification(today, today)
      .then((res) => setNotificationCount(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  const notificationPopUp = () => {
    navigate("/enquiry", { state: { startDate, endDate } });
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-wrap bg-white shadow-sm">
        <h2 className="mb-2 mb-md-0">Admin Dashboard</h2>

        <div className="d-flex align-items-center">
          {/* Notification */}
          <div className="position-relative me-3">
            <img
              src="/notification.png"
              alt="Notification"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={notificationPopUp}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notificationCount ?? 0}
            </span>
          </div>

          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 bg-light p-3 border-end vh-100">
          <h5 className="mb-4">Navigation</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={() => navigate("/addcourse")}
              >
                <AiOutlinePlus className="me-2" /> Add Course
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={() => navigate("/courses")}
              >
                <AiOutlineUnorderedList className="me-2" /> View Courses
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={() => navigate("/enquiry")}
              >
                <AiOutlineLineChart className="me-2" /> Show All Enquiries
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={() => navigate("/batch")}
              >
                <AiOutlineCalendar className="me-2" /> Add New Batch
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={() => navigate("/testimonials")}
              >
                <FaUserGraduate className="me-2" /> Add Testimonials
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center"
                onClick={uploadPosts}
              >
                <FaUpload className="me-2" /> Upload Posts
              </button>
            </li>
          </ul>
        </div>
        {/* Modal Form */}
        {showForm && (
          <div className="upload-modal">
            <div className="upload-card p-4">
              <h5 className="text-center mb-3">Upload Post</h5>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Post Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="mb-3">
                  <label className="form-label">Upload File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={closeForm}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="col-12 col-md-9 p-4">
          <h4>Welcome, Admin!</h4>
          <p>Manage courses, view student progress, and monitor notifications.</p>

          {/* Metrics Cards */}
          <div className="row g-3 mt-4">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card shadow-sm text-center p-3 h-100">
                <FaUserGraduate size={30} className="mb-2 text-primary" />
                <h6>Total Students</h6>
                <h3>{studentsCount ?? 0}</h3>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card shadow-sm text-center p-3 h-100">
                <FaBook size={30} className="mb-2 text-success" />
                <h6>Total Courses</h6>
                <h3>{courseCounts ?? 0}</h3>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card shadow-sm text-center p-3 h-100">
                <FaChalkboardTeacher size={30} className="mb-2 text-warning" />
                <h6>Active Staff</h6>
                <h3>{adminCount ?? 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
