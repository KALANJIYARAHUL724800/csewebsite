import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeaderComponent from './components/headerComponent'
import FooterComponent from './components/footerComponent'
import HomeComponent from './components/HomeComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutComponent from './components/AboutComponent';
import CoursesComponent from './components/CoursesComponent';
import ProgressComponent from './components/ProgressComponent';
import ContactComponent from './components/ContactComponent';
import GalleryComponent from './components/GalleryComponent';
import StudentLogin from './components/StudentLogin';
import StaffLogin from './components/StaffLogin';
import StudentSignup from './components/StudentSignup';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import CourseContent from './components/CourseContent';
import AddCourseComponent from './components/AddCourseComponent';
import StaffsignupComponent from './components/StaffsignupComponent';
import DashboardComponent from './components/DashboardComponent';
import ProtectedRoute from './components/ProtectedRoute';
import CourseContentAddForm from './components/CourseContentAddForm';
import ShowFeesEnquiryComponent from './components/ShowFeesEnquiryComponent';
import EventComponent from './components/EventComponent';
import BatchComponent from './components/BatchComponent';
function App() {

  return (
    <>
      <HeaderComponent />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/about" element={<AboutComponent />} />
            <Route path="/courses" element={<CoursesComponent />} />
            <Route path="/progress" element={<ProgressComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/gallery" element={<GalleryComponent />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/signup" element={<StudentSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/admin" element={<StaffLogin />} />
            <Route path="/events" element={<EventComponent />} />
            <Route path="/admin-signup" element={<StaffsignupComponent />} />
            <Route path="/course/:id" element={<CourseContent />} />
            <Route path="/batch"
              element={
                <ProtectedRoute>
                  <BatchComponent />
                </ProtectedRoute>
              } />
            <Route path="/enquiry"
              element={
                <ProtectedRoute>
                  <ShowFeesEnquiryComponent />
                </ProtectedRoute>
              } />
            <Route path="/addcoursecontent"
              element={
                <ProtectedRoute>
                  <CourseContentAddForm />
                </ProtectedRoute>
              } />
            <Route
              path="/addcoursecontent/:id"
              element={
                <ProtectedRoute>
                  <CourseContentAddForm />
                </ProtectedRoute>
              }
            />
            <Route path="/addcourse"
              element={
                <ProtectedRoute>
                  <AddCourseComponent />
                </ProtectedRoute>
              } />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
          <br /><br />
        </div>
      </Router>
      <FooterComponent />

    </>
  )
}

export default App
