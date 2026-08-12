
import React, { useEffect, useState } from "react";
import {
    FaEdit,
    FaEye,
    FaCertificate,
    FaTimes
} from "react-icons/fa";

import { viewCertificates,updateCertificate } from "../index.js";

import "bootstrap/dist/css/bootstrap.min.css";

const ViewCertificates = () => {

    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        certificateName: "",
        grade: "",
        enrollNumber: "",
        certificateDate: "",
        institutionName: "CSE COMPUTER EDUCATION",
        location: "",
        joinDate: "",
        endDate: ""
    });

    useEffect(() => {

        const fetchCertificates = async () => {

            try {

                setLoading(true);

                const response = await viewCertificates();

                console.log("API RESPONSE:", response);

                console.log("CERTIFICATES:", response.data);

                if (Array.isArray(response.data)) {

                    setCertificates(response.data);

                } else if (
                    Array.isArray(response.data?.data)
                ) {

                    setCertificates(response.data.data);

                } else {

                    setCertificates([]);

                }

            } catch (err) {

                console.error(
                    "Certificate loading error:",
                    err
                );

                setError(
                    err.response?.data ||
                    "Failed to load certificates"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCertificates();

    }, []);

   const handleEdit = (certificate) => {

    const locationValue =
        String(certificate.location || "")
            .trim()
            .toUpperCase();

    setSelectedCertificate(certificate);

    setFormData({

        name: certificate.name || "",

        certificateName:
            certificate.certificateName || "",

        grade:
            certificate.grade || "",

        enrollNumber:
            certificate.enrollNumber ?? "",

        certificateDate:
            certificate.certificateDate || "",

        institutionName:
            certificate.institutionName ||
            "CSE COMPUTER EDUCATION",

        location: locationValue,

        joinDate:
            certificate.joinDate || "",

        endDate:
            certificate.endDate || ""

    });

    setSuccess("");
    setError("");

    setTimeout(() => {

        document
            .getElementById("certificate-update-form")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 100);
};

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleCancel = () => {

        setSelectedCertificate(null);

        setFormData({

            name: "",
            certificateName: "",
            grade: "",
            enrollNumber: "",
            certificateDate: "",
            institutionName:
                "CSE COMPUTER EDUCATION",
            location: "",
            joinDate: "",
            endDate: ""

        });

    };

   const handleUpdate = async (e) => {

    e.preventDefault();

    if (!selectedCertificate) {
        return;
    }

    const payload = {
        name: formData.name.trim().toUpperCase(),
        certificateName: formData.certificateName,
        grade: formData.grade,

        enrollNumber: formData.enrollNumber
            ? Number(formData.enrollNumber)
            : null,

        certificateDate: formData.certificateDate,
        institutionName: "CSE COMPUTER EDUCATION",
        location: formData.location,
        joinDate: formData.joinDate,
        endDate: formData.endDate
    };

    console.log("UPDATE ID:", selectedCertificate.id);
    console.log("UPDATE PAYLOAD:", payload);

    try {

        const response = await updateCertificate(
            selectedCertificate.id,
            payload
        );

        console.log("UPDATE RESPONSE:", response.data);

        // Update local state
        setCertificates((oldCertificates) =>
            oldCertificates.map((certificate) =>
                certificate.id === selectedCertificate.id
                    ? response.data
                    : certificate
            )
        );

        setSuccess("Certificate updated successfully!");

        // Close edit form
        setSelectedCertificate(null);

        // Reset form
        setFormData({
            name: "",
            certificateName: "",
            grade: "",
            enrollNumber: "",
            certificateDate: "",
            institutionName: "CSE COMPUTER EDUCATION",
            location: "",
            joinDate: "",
            endDate: ""
        });

        setTimeout(() => {
            setSuccess("");
        }, 3000);

    } catch (error) {

        console.error("UPDATE ERROR:", error);

        if (error.response?.status === 409) {

            setSuccess("Enroll Number already exists!");

        } else if (error.response?.status === 400) {

            setSuccess("Please check the entered details!");

        } else if (error.response?.status === 404) {

            setSuccess("Certificate not found!");

        } else {

            setSuccess("Certificate update failed!");
        }
    }
};

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="text-muted mt-3">
                    Loading certificates...
                </p>

            </div>

        );

    }

    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">

                        <FaCertificate
                            className="text-primary me-2"
                        />

                        Certificates

                    </h3>

                    <p className="text-muted mb-0">

                        View and manage student certificates

                    </p>

                </div>


                <span className="badge bg-primary fs-6">

                    Total: {certificates.length}

                </span>

            </div>

            {error && (

                <div className="alert alert-danger text-center">

                    {error}

                </div>

            )}

            {success && (

                <div className="alert alert-success text-center">

                    <strong>
                        {success}
                    </strong>

                </div>

            )}
            {selectedCertificate && (

                <div
                    id="certificate-update-form"
                    className="card border-0 shadow-lg rounded-4 mb-4"
                >

                    {/* FORM HEADER */}

                    <div className="card-header bg-primary text-white rounded-top-4">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h5 className="fw-bold mb-1">

                                    Update Certificate

                                </h5>

                                <small>
                                    Edit selected certificate details
                                </small>

                            </div>


                            <button
                                type="button"
                                className="btn btn-light btn-sm"
                                onClick={handleCancel}
                            >

                                <FaTimes />

                            </button>

                        </div>

                    </div>


                    {/* FORM */}

                    <div className="card-body p-4">

                        <form onSubmit={handleUpdate}>

                            <div className="row">


                                {/* NAME */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Name

                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* CERTIFICATE NAME */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Certificate Name

                                    </label>

                                    <input
                                        type="text"
                                        name="certificateName"
                                        className="form-control"
                                        value={
                                            formData.certificateName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* ENROLL NUMBER */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Enroll Number

                                    </label>

                                    <input
                                        type="text"
                                        name="enrollNumber"
                                        className="form-control"
                                        maxLength={6}
                                        value={
                                            formData.enrollNumber
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* CERTIFICATE DATE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Certificate Date

                                    </label>

                                    <input
                                        type="date"
                                        name="certificateDate"
                                        className="form-control"
                                        value={
                                            formData.certificateDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* JOIN DATE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Joining Date

                                    </label>

                                    <input
                                        type="date"
                                        name="joinDate"
                                        className="form-control"
                                        value={
                                            formData.joinDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* END DATE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        End Date

                                    </label>

                                    <input
                                        type="date"
                                        name="endDate"
                                        className="form-control"
                                        value={
                                            formData.endDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* GRADE */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Grade

                                    </label>

                                    <select
                                        name="grade"
                                        className="form-control"
                                        value={
                                            formData.grade
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="">
                                            -- Choose Grade --
                                        </option>

                                        <option value="A+">
                                            A+
                                        </option>

                                        <option value="A">
                                            A
                                        </option>

                                        <option value="B">
                                            B
                                        </option>

                                    </select>

                                </div>


                                {/* LOCATION */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Location

                                    </label>

                                    <select
                                        name="location"
                                        className="form-control"
                                        value={
                                            formData.location
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    >

                                        <option value="">
                                            -- Choose Location --
                                        </option>

                                        <option value="RAMNAD">
                                            Ramnad
                                        </option>

                                        <option value="UDUMALPET">
                                            Udumalpet
                                        </option>

                                        <option value="KILAKARAI">
                                            Kilakarai
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div className="d-flex justify-content-center gap-3 mt-4">

                                <button
                                    type="button"
                                    className="btn btn-secondary px-4"
                                    onClick={handleCancel}
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    className="btn btn-primary px-5"
                                >

                                    Update Certificate

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-header bg-white border-0 p-3">

                    <h5 className="fw-bold mb-0">

                        Certificate List

                    </h5>

                </div>


                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th className="px-4">
                                    #
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Certificate
                                </th>

                                <th>
                                    Enroll No
                                </th>

                                <th>
                                    Grade
                                </th>

                                <th>
                                    Location
                                </th>

                                <th>
                                    Certificate Date
                                </th>

                                <th className="text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {certificates.length > 0 ? (

                                certificates.map(
                                    (certificate, index) => (

                                        <tr
                                            key={
                                                certificate.id ||
                                                index
                                            }
                                        >

                                            <td className="px-4">
                                                {index + 1}
                                            </td>


                                            <td className="fw-bold text-uppercase">

                                                {
                                                    certificate.name
                                                }

                                            </td>


                                            <td>

                                                {
                                                    certificate.certificateName
                                                }

                                            </td>


                                            <td>

                                                {
                                                    certificate.enrollNumber
                                                }

                                            </td>


                                            <td>

                                                <span className="badge bg-success">

                                                    {
                                                        certificate.grade
                                                    }

                                                </span>

                                            </td>


                                            <td className="text-uppercase">

                                                {
                                                    certificate.location
                                                }

                                            </td>


                                            <td>

                                                {
                                                    certificate.certificateDate
                                                }

                                            </td>


                                            <td>

                                                <div className="d-flex justify-content-center gap-2">


                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="View"
                                                    >

                                                        <FaEye />

                                                    </button>


                                                    {/* EDIT */}

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-warning"
                                                        title="Edit"
                                                        onClick={() =>
                                                            handleEdit(
                                                                certificate
                                                            )
                                                        }
                                                    >

                                                        <FaEdit />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )

                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-5 text-muted"
                                    >

                                        No certificates found

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default ViewCertificates;

