import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AiOutlinePlus,
    AiOutlineUnorderedList,
    AiOutlineLineChart,
    AiOutlineCalendar
} from "react-icons/ai";

const TestDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/home");
    };

    function notificationPopUp() {
        navigate("/enquiry");
    }

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom flex-wrap">
                <h2 className="mb-2 mb-md-0">Admin Dashboard</h2>

                <div className="d-flex align-items-center">
                    {/* Notification Icon with Badge */}
                    <div className="position-relative me-3" style={{ lineHeight: 0 }}>
                        <img
                            src="/notification.png"
                            alt="Notification"
                            style={{
                                height: "40px",
                                cursor: "pointer",
                                display: "block"
                            }}
                            onClick={notificationPopUp}
                        />
                        {/* Red count badge — tightly attached to bell */}
                        <span
                            className="position-absolute badge rounded-pill bg-danger"
                            style={{
                                fontSize: "11px",
                                top: "2px",
                                right: "2px",
                                transform: "translate(50%, -50%)"
                            }}
                        >
                            3
                        </span>
                    </div>

                    {/* Logout button */}
                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="row">
                {/* Sidebar */}
                <div className="col-12 col-md-3 bg-light p-3 mb-3 mb-md-0 rounded">
                    <h5>Navigation</h5>
                    <ul className="list-unstyled">
                        <li>
                            <button
                                className="btn btn-link d-flex align-items-center w-100 text-start"
                                onClick={() => navigate("/addcourse")}
                            >
                                <AiOutlinePlus className="me-2" /> Add Course
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-link d-flex align-items-center w-100 text-start"
                                onClick={() => navigate("/courses")}
                            >
                                <AiOutlineUnorderedList className="me-2" /> View Courses
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-link d-flex align-items-center w-100 text-start"
                                onClick={() => navigate("/progress")}
                            >
                                <AiOutlineLineChart className="me-2" /> Student Progress
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn-link d-flex align-items-center w-100 text-start"
                                onClick={() => navigate("/batch")}
                            >
                                <AiOutlineCalendar className="me-2" /> Add New Batch
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-12 col-md-9 p-3">
                    <h4>Welcome, Admin!</h4>
                    <p>Here you can manage courses, view student progress, and more.</p>

                    {/* Metrics */}
                    <div className="row mt-4">
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card text-center p-3 shadow-sm">
                                <h5>Total Students</h5>
                                <p>120</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card text-center p-3 shadow-sm">
                                <h5>Total Courses</h5>
                                <p>15</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 mb-3">
                            <div className="card text-center p-3 shadow-sm">
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

export default TestDashboard;
