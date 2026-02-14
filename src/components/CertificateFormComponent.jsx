import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { insertCertificate } from "../index.js"
export default function CertificateFormComponent() {
    const [formData, setFormData] = useState({
        name: "",
        certificateName: "",
        grade: "",
        enrollNumber: "",
        certificateDate: "",
        institutionName: "",
        location: "",
        joinDate: "",
        endDate: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        certificateName: "",
        grade: "",
        enrollNumber: "",
        certificateDate: "",
        institutionName: "",
        location: "",
        joinDate: "",
        endDate: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name.toUpperCase(),
            certificateName: formData.certificateName,
            grade: formData.grade,
            enrollNumber: formData.enrollNumber ? Number(formData.enrollNumber) : null,
            certificateDate: formData.certificateDate,
            institutionName: "CSE COMPUTER EDUCATION",
            location: formData.location,
            joinDate: formData.joinDate,
            endDate: formData.endDate
        }
        await insertCertificate(payload).then((response) => {
            setSuccess(true)
            setFormData({
                name: "",
                certificateName: "",
                grade: "",
                enrollNumber: "",
                certificateDate: "",
                institutionName: "",
                location: "",
                joinDate: "",
                endDate: ""
            })
        }).catch((error) => {
            setErrors(error.response.data);
            console.log(error.response.data)
        })
    };

    return (
        <div className="container mt-5">
            {
                success && (
                    <div className="container mt-4">
                        <div className="alert alert-success alert-dismissible fade show text-center shadow-sm p-3 rounded" role="alert">
                            <strong>Success!</strong> Certificate Verified Successfully.
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                    </div>
                )
            }
            <div className="card shadow-lg p-4 rounded-4">
                <h3 className="text-center mb-4">Certificate Form</h3>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="text-danger mb-2 para">{errors.name}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Certification Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.certificateName ? "is-invalid" : ""}`}
                                name="certificateName"
                                value={formData.certificateName}
                                onChange={handleChange}

                            />
                            {errors.certificateName && <div className="text-danger mb-2 para">{errors.certificateName}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Enroll Number</label>
                            <input
                                type="text"
                                className={`form-control ${errors.enrollNumber ? "is-invalid" : ""}`}
                                name="enrollNumber"   // <- match formData key
                                maxLength={6}
                                value={formData.enrollNumber}
                                onChange={handleChange}
                            />
                            {errors.enrollNumber && <div className="text-danger mb-2 para">{errors.enrollNumber}</div>}
                        </div>


                        <div className="col-md-6 mb-3">
                            <label className="form-label">Certificate Date</label>
                            <input
                                type="date"
                                className={`form-control ${errors.certificateDate ? "is-invalid" : ""}`}
                                name="certificateDate"
                                value={formData.certificateDate}
                                onChange={handleChange}

                            />
                            {errors.certificateDate && <div className="text-danger mb-2 para">{errors.certificateDate}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Joining Date</label>
                            <input
                                type="date"
                                className={`form-control ${errors.joinDate ? "is-invalid" : ""}`}
                                name="joinDate"
                                value={formData.joinDate}
                                onChange={handleChange}

                            />
                            {errors.joinDate && <div className="text-danger mb-2 para">{errors.joinDate}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}

                            />
                            {errors.endDate && <div className="text-danger mb-2 para">{errors.endDate}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Grade</label>
                            <select name="grade" className={`form-control ${errors.grade ? "is-invalid" : ""}`}
                                value={formData.grade}
                                onChange={handleChange}
                            >
                                <option>--Choose grade--</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                            </select>
                            {errors.grade && <div className="text-danger mb-2 para">{errors.grade}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Location</label>
                            <select name="location" className={`form-control ${errors.location ? "is-invalid" : ""}`}
                                value={formData.location}
                                onChange={handleChange}
                            >
                                <option>--Choose Location--</option>
                                <option value="Ramnad">Ramnad</option>
                                <option value="Kilakarai">Kilakarai</option>
                            </select>
                            {errors.location && <div className="text-danger mb-2 para">{errors.location}</div>}
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary px-5">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
