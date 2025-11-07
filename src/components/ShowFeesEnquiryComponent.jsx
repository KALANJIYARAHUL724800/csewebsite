import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaPhone, FaBookOpen, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { showAllFeesEnquiry, searchDateEnquiry } from "../index";
import { useLocation } from "react-router-dom";

const ShowFeesEnquiryComponent = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilteredMode, setIsFilteredMode] = useState(false);

  const location = useLocation();
  const state = location.state || {};
  const passedStartDate = state.startDate;
  const passedEndDate = state.endDate;

  useEffect(() => {
    if (passedStartDate && passedEndDate) {
      setStartDate(passedStartDate);
      setEndDate(passedEndDate);
      setIsFilteredMode(true);

      searchDateEnquiry(passedStartDate, passedEndDate)
        .then((res) => {
          setEnquiries(res.data);
          setFilteredData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching filtered enquiries:", err);
        });
    } else {
      showAllFeesEnquiry()
        .then((res) => {
          setIsFilteredMode(false);
          setEnquiries(res.data);
          setFilteredData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching enquiries:", err);
        });
    }
  }, [passedStartDate, passedEndDate]);

  const handleFilter = () => {
    if (!startDate && !endDate) {
      setFilteredData(enquiries);
      return;
    }

    const filtered = enquiries.filter(enquiry => {
      const enquiryDate = new Date(enquiry.currentDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) return enquiryDate >= start && enquiryDate <= end;
      if (start) return enquiryDate >= start;
      if (end) return enquiryDate <= end;
      return true;
    });

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(enquiries);
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center text-primary fw-bold">💰 Fees Enquiry List</h3>

      {/* Filter Section */}
      <div className="row mb-3 g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label fw-bold">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-bold">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-success d-flex align-items-center" onClick={handleFilter}>
            <FaCalendarAlt className="me-2" /> Filter
          </button>
          <button className="btn btn-secondary d-flex align-items-center" onClick={handleReset}>
            <FaClock className="me-2" /> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-secondary text-dark">
            <tr>
              <th>ID</th>
              <th><FaUser className="me-1" /> Name</th>
              <th><FaPhone className="me-1" /> Phone</th>
              <th><FaBookOpen className="me-1" /> Course</th>
              <th><FaCalendarAlt className="me-1" /> Date</th>
              <th><FaClock className="me-1" /> Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((enquiry, index) => (
                <tr key={enquiry.id} className="align-middle">
                  <td>{isFilteredMode ? index + 1 : enquiry.id}</td>
                  <td className="text-success fw-bold">{enquiry.name}</td>
                  <td>{enquiry.phone}</td>
                  <td className="fw-semibold">{enquiry.courseName}</td>
                  <td>{enquiry.currentDate}</td>
                  <td>{enquiry.currentTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger fw-bold">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowFeesEnquiryComponent;
