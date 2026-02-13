import React from "react";
import { useState } from 'react';
const CertificateComponent = () => {

  const [enroll, setEnroll] = useState({
    enrollno: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEnroll({
      ...enroll,
      [name]: value
    })
  }

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(to right, #dce8e6, #f2f2f2)",
        padding: "80px 0",
      }}
    >
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
                onClick={() => {
                  console.log(enroll);
                }}
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

      {/* Certitificate Details */}
      <div className="row">
                
      </div>
    </div>
  );
};

export default CertificateComponent;
