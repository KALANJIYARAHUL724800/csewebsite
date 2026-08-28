import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";
import AboutComponent from "./components/AboutComponent";
import CoursesComponent from "./components/CoursesComponent";
import ProgressComponent from "./components/ProgressComponent";
import ContactComponent from "./components/ContactComponent";
import GalleryComponent from "./components/GalleryComponent";
import StudentLogin from "./components/StudentLogin";
import StudentSignup from "./components/StudentSignup";
import StaffLogin from "./components/StaffLogin";
import StaffsignupComponent from "./components/StaffsignupComponent";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import CourseContent from "./components/CourseContent";
import AddCourseComponent from "./components/AddCourseComponent";
import DashboardComponent from "./components/DashboardComponent";
import CourseContentAddForm from "./components/CourseContentAddForm";
import ShowFeesEnquiryComponent from "./components/ShowFeesEnquiryComponent";
import EventComponent from "./components/EventComponent";
import BatchComponent from "./components/BatchComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import StudentDashBoard from "./components/StudentDashBoard";
import TestiMonialsComponent from "./components/TestiMonialsComponent";
import ViewStudentComponent from "./components/ViewStudentComponent";
import CertificateComponent from "./components/CertificateComponent";
import CertificateFormComponent from "./components/CertificateFormComponent";
import PrivateCeritificateUrl from "./components/PrivateCeritificateUrl";
import ViewCertificates from "./components/ViewCertificates";
import PasswordProtectRoute from "./components/PasswordProtectRoute";
import BlogDetailsComponent from "./components/BlogDetailsComponent";

function App() {
	return (
		<>
			<HeaderComponent />
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<HomeComponent />} />
					<Route path="/home" element={<HomeComponent />} />
					<Route path="/about" element={<AboutComponent />} />
					<Route path="/courses" element={<CoursesComponent />} />
					<Route path="/progress" element={<ProgressComponent />} />
					<Route path="/contact" element={<ContactComponent />} />
					<Route path="/gallery" element={<GalleryComponent />} />
					<Route path="/events" element={<EventComponent />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/testimonials" element={<TestiMonialsComponent />} />
					<Route path="/view-students" element={<ViewStudentComponent />} />
					<Route
						path="/upload-certificate"
						element={<CertificateFormComponent />}
					/>
					<Route path="/view-certificate" element={<CertificateComponent />} />
					{/* Public Routes only if not logged in */}
					<Route
						path="/login"
						element={
							<PublicRoute>
								<StudentLogin />
							</PublicRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							// <PrivateRoute allowedUserType="true">
							<StudentSignup />
							// </PrivateRoute>
						}
					/>
					<Route
						path="/update-password"
						element={
							<PasswordProtectRoute>
								<PublicRoute>
									<UpdatePassword />
								</PublicRoute>
							</PasswordProtectRoute>
						}
					/>
					<Route path="/blog/:id" element={<BlogDetailsComponent />} />
					<Route
						path="/admin"
						element={
							<PublicRoute>
								<StaffLogin />
							</PublicRoute>
						}
					/>
					<Route
						path="/admin-signup"
						element={
							<PublicRoute>
								<StaffsignupComponent />
							</PublicRoute>
						}
					/>

					{/* Protected Routes */}
					<Route
						path="/course/:id"
						element={
							<ProtectedRoute>
								<CourseContent />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/batch"
						element={
							<ProtectedRoute>
								<BatchComponent />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/enquiry"
						element={
							<ProtectedRoute>
								<ShowFeesEnquiryComponent />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/addcoursecontent"
						element={
							<ProtectedRoute>
								<CourseContentAddForm />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/addcoursecontent/:id"
						element={
							<ProtectedRoute>
								<CourseContentAddForm />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/addcourse"
						element={
							<ProtectedRoute>
								<AddCourseComponent />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<PrivateRoute allowedUserType="true">
								<DashboardComponent />
							</PrivateRoute>
						}
					/>
					<Route
						path="/upload-certificate"
						element={
							<PrivateCeritificateUrl allowedUserType="true">
								<CertificateFormComponent />
							</PrivateCeritificateUrl>
						}
					/>
					<Route
						path="/view-certificates"
						element={
							<PrivateCeritificateUrl allowedUserType="true">
								<ViewCertificates />
							</PrivateCeritificateUrl>
						}
					/>
					<Route
						path="/student-dashboard"
						element={
							<PrivateRoute allowedUserType="false">
								<StudentDashBoard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/change-password"
						element={
							<PrivateRoute allowedUserType="false">
								<UpdatePassword />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/home" replace />} />
				</Routes>
			</Router>
			<FooterComponent />
		</>
	);
}

export default App;
