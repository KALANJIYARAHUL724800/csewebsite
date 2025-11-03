import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLaptopCode, FaBookOpen, FaUserFriends, FaTools, FaListAlt, FaBriefcase } from 'react-icons/fa';

const CourseContent = () => {
  const courseSections = [
    { icon: <FaBookOpen size={30} />, title: "Course Title", text: "HDCA (Higher Diploma in Computer Applications)" },
    { icon: <FaLaptopCode size={30} />, title: "What You Will Learn", text: "Learn practical computer skills: Tally, MS Office (Word, Excel, PowerPoint), basic programming, and database management." },
    { icon: <FaUserFriends size={30} />, title: "Who Can Join", text: "Students, office workers, or anyone wanting to learn useful computer skills." },
    { icon: <FaTools size={30} />, title: "Skills You Will Gain", text: "Use Tally, create documents & spreadsheets, write basic programs, and manage databases." },
    { icon: <FaListAlt size={30} />, title: "Course Topics", text: "Tally, MS Office, Programming Basics, and Database Management." },
    { icon: <FaBriefcase size={30} />, title: "Career Opportunities", text: "Work as a Tally Operator, Data Entry Operator, Office Assistant, or start your own small IT/accounting business." }
  ];

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZS5lQCvP0Z4Dz6SZaRNenWeXXFivGmn9gng&s"
  ];

  return (
    <div className="container my-5">
      {/* Page Title */}
      <h1 className="text-center mb-5" style={{ fontWeight: "700", color: "#007bff",fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#007bff" }}>
        HDCA (Higher Diploma in Computer Applications)
      </h1>

      {/* Image */}
      <div className="d-flex justify-content-center mb-5">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`HDCA ${idx + 1}`}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "250px" }}
          />
        ))}
      </div>

      {/* Course Sections - Stylish Cards */}
      <div className="row g-4">
        {courseSections.map((section, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div
              className="p-4 text-center rounded shadow"
              style={{
                background: "linear-gradient(145deg, #e0f7fa, #fff)",
                transition: "transform 0.3s, box-shadow 0.3s",
                height: "100%"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <div className="mb-3" style={{ color: "#007bff" }}>{section.icon}</div>
              <h5 className="mb-2 fw-bold">{section.title}</h5>
              <p className="mb-0" style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", lineHeight: "1.6" }}>{section.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
