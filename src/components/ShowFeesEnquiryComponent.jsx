import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaPhone, FaBookOpen, FaCalendarAlt, FaClock, FaFileExcel } from 'react-icons/fa';
import { showAllFeesEnquiry, searchDateEnquiry, enquiryExportExcel } from "../index";
import { useLocation } from "react-router-dom";

const ShowFeesEnquiryComponent = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilteredMode, setIsFilteredMode] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const location = useLocation();
  const state = location.state || {};
  const passedStartDate = state.startDate;
  const passedEndDate = state.endDate;

  // Helper: format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

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
        .catch((err) => console.error("Error fetching filtered enquiries:", err));
    } else {
      showAllFeesEnquiry()
        .then((res) => {
          setIsFilteredMode(false);
          setEnquiries(res.data);
          setFilteredData(res.data);
        })
        .catch((err) => console.error("Error fetching enquiries:", err));
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

  const exportExcel = () => {
    // Use selected dates or default to today
    const start = startDate || formatDate(new Date());
    const end = endDate || formatDate(new Date());

    enquiryExportExcel(start, end)
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const now = new Date();
        const formattedNow = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
        link.setAttribute('download', `enquiries_${start}_${end}_${formattedNow}.xlsx`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      })
      .catch((err) => console.error("Error downloading Excel:", err));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center text-primary fw-bold">💰 Fees Enquiry List</h3>

      {/* Filter Section */}
      <div className="row mb-3 g-2 align-items-end">
        {/* Date Inputs */}
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

        {/* Filter & Reset Buttons */}
        <div className="col-md-3 d-flex gap-2 mt-2 mt-md-0">
          <button className="btn btn-success d-flex align-items-center" onClick={handleFilter}>
            <FaCalendarAlt className="me-2" /> Filter
          </button>
          <button className="btn btn-secondary d-flex align-items-center" onClick={handleReset}>
            <FaClock className="me-2" /> Reset
          </button>
        </div>

        {/* Download Excel Button */}
        <div className="col-md-3 d-flex justify-content-md-end mt-2 mt-md-0">
          <button className="btn btn-success d-flex align-items-center" onClick={exportExcel}>
            <FaFileExcel className="me-2" color="white" /> Download Excel
          </button>
        </div>
      </div>

      {/* Download Success Toast */}
      {downloadSuccess && (
        <div className="alert alert-success position-fixed bottom-0 end-0 m-3">
          Excel downloaded successfully!
        </div>
      )}

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
                <tr key={enquiry.id}>
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
