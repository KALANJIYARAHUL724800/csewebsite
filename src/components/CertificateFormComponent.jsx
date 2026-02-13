import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CertificateFormComponent() {
    const [formData, setFormData] = useState({
        name: "",
        certification: "",
        grade: "",
        certificateNumber: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: formData.name.toUpperCase(),
            certificateName: formData.certification,
            grade: formData.grade,
            enrollNumber: Number(formData.certificateNumber),
            certificateDate: formData.certificateDate,
            institutionName: "CSE COMPUTER EDUCATION",
            location: "RAMNAD, KILAKARAI",
            joinDate: formData.joinDate,
            endDate: formData.endDate
        }
        console.log(payload);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded-4">
                <h3 className="text-center mb-4">Certificate Form</h3>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Certification Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="certification"
                                value={formData.certification}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Enroll Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="certificateNumber"
                                maxLength={6}
                                value={formData.certificateNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Certificate Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="certificateDate"
                                value={formData.certificateDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Joining Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="joinDate"
                                value={formData.joinDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Grade</label>
                            <select name="grade" className="form-control"
                                value={formData.grade}
                                onChange={handleChange}
                            >
                                <option>--Choose grade--</option>
                                <option value="> =75%">A+</option>
                                <option value="> =60% <75%">A</option>
                                <option value="> =36% <60%">B</option>
                            </select>
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
