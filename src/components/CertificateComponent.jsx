import React from "react";
import { useState } from 'react';
import { findCertificate } from "../index";
const CertificateComponent = () => {

  const [enroll, setEnroll] = useState({
    enrollno: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setEnroll({
        ...enroll,
        [name]: value
      });
    }

  }
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const findCertiticateByEnrollNo = async () => {
    setError(false);
    setIsData(false);

    try {
      const response = await findCertificate(enroll.enrollno);

      if (response.data && response.data.length > 0) {
        setData(response.data[0]);
        setIsData(true);
      } else {
        setError(true);
      }

      setEnroll({ enrollno: "" });

    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 3000);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(to right, #dce8e6, #f2f2f2)",
        padding: "80px 0",
      }}
    >
      {/* Error Popup */}
      {
        error && (
          <div className="container mt-4">
            <div className="alert alert-danger text-center shadow-sm p-3 rounded">
              <strong>Certificate Not Found!</strong>
            </div>
          </div>
        )
      }

      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">

            <h2
              style={{
                color: "#7fb02c",
                fontWeight: "700",
                fontSize: "36px",
                marginBottom: "20px",
              }}
            >
              Verify Your Certificate
            </h2>

            <p
              style={{
                color: "#6c757d",
                fontSize: "16px",
                maxWidth: "500px",
                marginBottom: "30px",
              }}
            >
              Validate your expertise with confidence! Verify your Tally
              certification now and showcase your accredited skills to
              potential employers.
            </p>

            {/* INPUT + BUTTON */}
            <div
              className="input-group shadow"
              style={{
                maxWidth: "500px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                type="text"
                placeholder="Enter Certificate Number"
                className="form-control border-0 py-3"
                style={{ fontSize: "15px" }}
                name="enrollno"
                maxLength={6}
                value={enroll.enrollno}
                onChange={handleChange}
              />

              <button
                className="btn px-4"
                style={{
                  backgroundColor: "#8cc63f",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
                onClick={findCertiticateByEnrollNo}
              >
                Verify Certificate
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src="certificate-banner.png"
              alt="certificate"
              className="img-fluid"
              style={{ maxHeight: "420px" }}
            />
          </div>

        </div>
      </div>

      {/* Certificate Data */}
      {
        isData && (
          <div className="container mt-5">

            {/* Top Header */}
            <div
              className="p-3 rounded-top d-flex align-items-center"
              style={{
                backgroundColor: "#8FB339",
                color: "white"
              }}
            >
              <i className="bi bi-check-circle-fill me-2 fs-4"></i>
              <div>
                <h5 className="mb-0 fw-bold">Certificate Verified</h5>
                <small>Valid certificate found</small>
              </div>
            </div>

            {/* Card Body */}
            <div
              className="card shadow border-0 rounded-bottom"
              style={{
                backgroundColor: "#F2F6E9",
                border: "2px solid #C5D6A0"
              }}
            >
              <div className="card-body p-4">

                {/* Logo */}
                <div className="mb-4">
                  <img
                    src="cselogo.png"
                    alt="cselogo"
                    style={{ height: "100px" }}
                    className="img-fluid"
                  />
                </div>

                <div className="row">

                  {/* Left Side */}
                  <div className="col-md-6">

                    <p>
                      <i className="bi bi-person-fill me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Name</strong><br />
                      <span className="text-primary">{data.name}</span>
                    </p>

                    <p>
                      <i className="bi bi-award me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Certificate Name</strong><br />
                      <span className="text-primary">{data.certificateName}</span>
                    </p>

                    <p>
                      <i className="bi bi-hash me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Certificate Number</strong><br />
                      <span className="text-primary">{data.enrollNumber}</span>
                    </p>

                    <p>
                      <i className="bi bi-patch-check me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Grade</strong><br />
                      <span className="text-primary">{data.grade}</span>
                    </p>

                    <p>
                      <i className="bi bi-calendar-event me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Certificate Date</strong><br />
                      <span className="text-primary">{data.certificateDate}</span>
                    </p>

                  </div>

                  {/* Right Side */}
                  <div className="col-md-6">

                    <p>
                      <i className="bi bi-calendar-plus me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Join Date</strong><br />
                      <span className="text-primary">{data.joinDate}</span>
                    </p>

                    <p>
                      <i className="bi bi-calendar-check me-2" style={{ color: "#8FB339" }}></i>
                      <strong>End Date</strong><br />
                      <span className="text-primary">{data.endDate}</span>
                    </p>

                    <p>
                      <i className="bi bi-geo-alt me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Location</strong><br />
                      <span className="text-primary">{data.location}</span>
                    </p>

                    <p>
                      <i className="bi bi-building me-2" style={{ color: "#8FB339" }}></i>
                      <strong>Institution Name</strong><br />
                      <span className="text-primary">{data.institutionName}</span>
                    </p>

                  </div>

                </div>

              </div>
            </div>

            {/* Grade Description */}
            <div className="container mt-4">

              {/* Header */}
              <div
                className="p-3 rounded-top fw-bold"
                style={{
                  backgroundColor: "#C8DCA3",
                  color: "#2E4A1F"
                }}
              >
                Grade Description
              </div>

              {/* Table */}
              <div
                className="rounded-bottom"
                style={{
                  backgroundColor: "#F2F6E9",
                  border: "1px solid #C5D6A0"
                }}
              >
                <table className="table mb-0 align-middle">
                  <thead>
                    <tr style={{ backgroundColor: "#DDE6C5" }}>
                      <th className="ps-4">Grade</th>
                      <th>Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="ps-4">
                        <span
                          className="d-inline-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#6C757D",
                            color: "white",
                            fontWeight: "bold"
                          }}
                        >
                          A+
                        </span>
                      </td>
                      <td>&gt;= 75%</td>
                    </tr>

                    <tr style={{ backgroundColor: "#EEF4DD" }}>
                      <td className="ps-4">
                        <span
                          className="d-inline-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#6C757D",
                            color: "white",
                            fontWeight: "bold"
                          }}
                        >
                          A
                        </span>
                      </td>
                      <td>&gt;= 60% &lt; 75%</td>
                    </tr>

                    <tr>
                      <td className="ps-4">
                        <span
                          className="d-inline-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#6C757D",
                            color: "white",
                            fontWeight: "bold"
                          }}
                        >
                          B
                        </span>
                      </td>
                      <td>&gt;= 36% &lt; 60%</td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )
      }
    </div>
  );
};

export default CertificateComponent;
