import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
	enquiryCountNotification,
	courseCount,
	countAdmin,
	countStudents,
	moveImage,
	insertPost,
	showAllPosts,
	getTotalLikes,
	insertComment,
	updateLikes,
} from "../index";
import {
	AiOutlinePlus,
	AiOutlineUnorderedList,
	AiOutlineLineChart,
	AiOutlineCalendar,
} from "react-icons/ai";
import {
	FaUserGraduate,
	FaBook,
	FaChalkboardTeacher,
	FaUpload,
	FaCheckCircle,
	FaRegFileAlt,
	FaCertificate,
} from "react-icons/fa";

const DashboardComponent = () => {
	const [posts, setPosts] = useState([]);
	const [commentText, setCommentText] = useState({});
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
	const [showSuccess, setShowSuccess] = useState(false);
	const [adminPostCheck, setAdminPostCheck] = useState(false);
	function uploadPosts() {
		setShowForm(true);
	}
	function viewPosts() {
		setAdminPostCheck(true);
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
				const imageUrl = res.filename || res.data || file.name;
				const postData = {
					title: title,
					imageUrl: imageUrl,
				};

				return insertPost(postData);
			})
			.then((res) => {
				setPosts((prevPosts) => [
					{
						...res.data,
						liked: false,
						likes: 0,
						comments: [],
					},
					...prevPosts,
				]);
				setShowSuccess(true);
				setTimeout(() => {
					setShowSuccess(false);
				}, 2000);
				closeForm();
			})
			.catch((err) => {
				setShowSuccess(false);
			});
	}
	useEffect(() => {
		const today = new Date().toISOString().split("T")[0];
		setStartDate(today);
		setEndDate(today);

		// Fetch counts
		const fetchCounts = async () => {
			try {
				const studentsRes = await countStudents();
				if (!studentsRes.data || studentsRes.data === 0) {
					SetStudentsCount(null);
				} else {
					SetStudentsCount(studentsRes.data);
				}
			} catch (err) {
				SetStudentsCount(null);
			}

			try {
				const adminRes = await countAdmin();
				SetAdminCount(adminRes.data);
			} catch (err) {
				SetAdminCount(null);
			}

			try {
				const courseRes = await courseCount();
				SetCourseCount(courseRes.data);
			} catch (err) {
				SetCourseCount(null);
			}

			try {
				const notifRes = await enquiryCountNotification(today, today);
				setNotificationCount(notifRes.data);
			} catch (err) {
				setNotificationCount(null);
			}
		};

		// Fetch posts
		const fetchPostsData = async () => {
			try {
				const res = await showAllPosts();
				const postsWithLikes = await Promise.all(
					res.data.map(async (p) => {
						const likesRes = await getTotalLikes(p.id);
						return { ...p, liked: false, likes: likesRes.data };
					}),
				);
				setPosts(postsWithLikes);
			} catch (err) {
				console.error(err);
			}
		};

		fetchCounts();
		fetchPostsData();

		// Refresh posts every 5 seconds
		const interval = setInterval(fetchPostsData, 5000);
		return () => clearInterval(interval);
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("userType");
		sessionStorage.removeItem("email");
		navigate("/home");
	};

	const notificationPopUp = () => {
		navigate("/enquiry", { state: { startDate, endDate } });
	};

	const fetchPosts = async () => {
		try {
			const res = await showAllPosts();
			const postsWithLikes = await Promise.all(
				res.data.map(async (p) => {
					const likesRes = await getTotalLikes(p.id);
					return { ...p, liked: false, likes: likesRes.data };
				}),
			);
			setPosts(postsWithLikes);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCommentPost = async (postId) => {
		try {
			const payload = { comments: commentText[postId], likes: 0 };
			const res = await insertComment(postId, payload);
			setPosts((prev) =>
				prev.map((p) =>
					p.id === postId
						? { ...p, comments: [...(p.comments || []), res.data] }
						: p,
				),
			);
			setCommentText({ ...commentText, [postId]: "" });
		} catch (error) {
			console.error(error);
		}
	};

	const toggleLike = (id) => {
		const post = posts.find((p) => p.id === id);
		if (!post) return;
		const newLiked = !post.liked;
		const newLikesCount = newLiked ? post.likes + 1 : post.likes - 1;

		setPosts((prev) =>
			prev.map((p) =>
				p.id === id ? { ...p, liked: newLiked, likes: newLikesCount } : p,
			),
		);

		updateLikes(id, { likes: newLikesCount }).catch(() => {
			setPosts((prev) =>
				prev.map((p) =>
					p.id === id ? { ...p, liked: post.liked, likes: post.likes } : p,
				),
			);
		});
	};
	const moveCertificate = () => {
		const userType = sessionStorage.getItem("userType");

		if (userType === "true") {
			navigate("/upload-certificate");
		} else {
			alert("Access Denied!");
			navigate("/home");
		}
	};
	const viewCertificatesPage = () => {
		navigate("/view-certificates");
	};
	return (
		<div className="container-fluid p-0">
			{/* Header */}
			<div className="d-flex justify-content-between align-items-center p-3 border-bottom flex-wrap bg-white shadow-sm">
				<h2 className="mb-2 mb-md-0 heading" style={{ color: "#004aad" }}>
					Admin Dashboard
				</h2>

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
					<h5 className="mb-4 heading" style={{ color: "#004aad" }}>
						Navigation
					</h5>
					<ul className="list-unstyled">
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => {
									setAdminPostCheck(false);
									navigate("/view-students");
								}}>
								<FaUserGraduate className="me-2" />
								View Students
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => navigate("/enquiry")}>
								<AiOutlineLineChart className="me-2" /> Show All Enquiries
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => navigate("/addcourse")}>
								<AiOutlinePlus className="me-2" /> Add Course
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => navigate("/courses")}>
								<AiOutlineUnorderedList className="me-2" /> View Courses
							</button>
						</li>

						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => navigate("/batch")}>
								<AiOutlineCalendar className="me-2" /> Add New Batch
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={() => navigate("/testimonials")}>
								<FaUserGraduate className="me-2" /> Add Testimonials
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={uploadPosts}>
								<FaUpload className="me-2" /> Upload Posts
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={viewPosts}>
								<FaRegFileAlt className="me-2" />
								View Posts
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={moveCertificate}>
								<FaCertificate className="me-2" />
								Certiticate Issued
							</button>
						</li>
						<li className="mb-2">
							<button
								className="btn btn-outline-primary w-100 d-flex align-items-center"
								onClick={viewCertificatesPage}>
								<FaCertificate className="me-2" />
								View Certiticates
							</button>
						</li>
					</ul>
				</div>
				{/* Modal Form */}
				{showForm && (
					<div className="upload-modal">
						<div className="upload-card p-4">
							<h5 className="text-center mb-3 heading">Upload Post</h5>

							<form onSubmit={handleSubmit}>
								{/* Title */}
								<div className="mb-3">
									<label className="form-label heading">Post Title</label>
									<input
										type="text"
										className="form-control para"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
									/>
								</div>

								{/* File Upload */}
								<div className="mb-3">
									<label className="form-label heading">Upload File</label>
									<input
										type="file"
										className="form-control para"
										onChange={(e) => setFile(e.target.files[0])}
										required
									/>
								</div>

								<div className="d-flex justify-content-between">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={closeForm}>
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
					{adminPostCheck == false && (
						<div>
							<h4 className="heading" style={{ color: "#004aad" }}>
								Welcome, Admin!
							</h4>
							<p className="para">
								Manage courses, view student progress, and monitor
								notifications.
							</p>
							{/* Metrics Cards */}
							<div className="row g-3 mt-4">
								<div className="col-12 col-sm-6 col-lg-4">
									<div className="card shadow-sm text-center p-3 h-100">
										<FaUserGraduate size={30} className="mb-2 text-primary" />
										<h6 className="heading">Total Students</h6>
										<h3 className="para">{studentsCount ?? 0}</h3>
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
										<FaChalkboardTeacher
											size={30}
											className="mb-2 text-warning"
										/>
										<h6>Active Staff</h6>
										<h3>{adminCount ?? 0}</h3>
									</div>
								</div>
							</div>
						</div>
					)}
					{adminPostCheck == true && (
						<div
							className="text-end py-2"
							onClick={() => {
								setAdminPostCheck(false);
							}}>
							<h1 className="heading text-center" style={{ color: "#004aad" }}>
								Posts
							</h1>
							<hr />
							<button className="btn btn-danger" aria-label="Close">
								X Close Posts
							</button>
						</div>
					)}
					{adminPostCheck == true && (
						<div
							className="w-100"
							style={{
								height: "100vh",
								overflowY: "scroll",
								scrollSnapType: "y mandatory",
							}}>
							{!posts.length ? (
								<h3 className="text-center mt-5">Loading posts...</h3>
							) : (
								posts.map((post) => (
									<div
										key={post.id}
										className="card border-0 shadow-lg"
										style={{
											height: "100vh",
											scrollSnapAlign: "start",
											borderRadius: "0",
										}}>
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
													className={`fs-4 ${post.liked ? "fas text-danger" : "far"} fa-heart`}
													onClick={() => toggleLike(post.id)}></i>
												<span>{post.likes}</span>

												<i
													className="far fa-comment fs-4 text-primary"
													data-bs-toggle="collapse"
													data-bs-target={`#commentBox${post.id}`}></i>

												<i className="fas fa-share fs-4 text-success"></i>
											</div>

											<div id={`commentBox${post.id}`} className="collapse">
												<input
													type="text"
													placeholder="Write a comment..."
													className="form-control mb-2"
													value={commentText[post.id] || ""}
													onChange={(e) =>
														setCommentText({
															...commentText,
															[post.id]: e.target.value,
														})
													}
												/>

												<button
													className="btn btn-primary w-100"
													onClick={() => handleCommentPost(post.id)}>
													Post Comment
												</button>
											</div>

											<p className="text-muted small">
												Swipe up for more posts
											</p>
										</div>
									</div>
								))
							)}
						</div>
					)}
				</div>
				{showSuccess && (
					<div
						className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
						style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
						<div
							className="bg-white p-4 rounded shadow text-center"
							style={{ minWidth: "300px", maxWidth: "400px" }}>
							<FaCheckCircle
								size={50}
								style={{ color: "green", marginBottom: "15px" }}
							/>
							<h5 className="mb-2">Successfully Post Uploaded!</h5>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardComponent;
