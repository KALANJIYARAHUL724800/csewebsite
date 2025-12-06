import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; 

import { getStudentsDetails } from "../index";

const ViewStudentComponent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 }); 
  }, []);

  useEffect(() => {
    getStudentsDetails()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students details:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Students Details</h3>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th data-aos="fade-down" className="header-icon">
              S.No <i className="bi bi-hash"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Name <i className="bi bi-person"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Enroll No <i className="bi bi-card-checklist"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Email <i className="bi bi-envelope"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Mobile <i className="bi bi-phone"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Gender <i className="bi bi-gender-ambiguous"></i>
            </th>
            <th data-aos="fade-down" className="header-icon">
              Address <i className="bi bi-geo-alt"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student.email || index}>
                <td>{index + 1}</td> {/* Serial number */}
                <td>{student.name}</td>
                <td>{student.enrollNo || "-"}</td>
                <td>{student.email}</td>
                <td>{student.mobile || "-"}</td>
                <td>{student.gender || "-"}</td>
                <td>{student.address || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Additional CSS for hover animation */}
      <style>{`
        .header-icon {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .header-icon:hover {
          transform: scale(1.2);
          color: #007bff;
        }
        .header-icon i {
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};

export default ViewStudentComponent;
