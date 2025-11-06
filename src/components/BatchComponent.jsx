import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaHashtag, FaBook, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { insertBatches, showAllBatches, deletedBatch, updateBatch } from "../index";

const BatchComponent = () => {
    const [batches, setBatches] = useState([]);
    const [formData, setFormData] = useState({ course: '', date: '', time: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');

    // Fetch all batches from API on load
    useEffect(() => {
        loadBatches();
    }, []);

    const loadBatches = async () => {
        try {
            const response = await showAllBatches();
            setBatches(response.data);
        } catch (error) {
            console.error("Error fetching batches:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // clear error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg('');

        try {
            if (editIndex !== null) {
                // Update existing batch
                const batchToUpdate = batches[editIndex];
                await updateBatch(batchToUpdate.id, formData);
                setSuccessMsg('Batch updated successfully!');
                setEditIndex(null); // exit edit mode
            } else {
                // Add new batch
                await insertBatches(formData);
                setSuccessMsg('Batch added successfully!');
            }

            setFormData({ course: '', date: '', time: '' });
            setTimeout(() => setSuccessMsg(''), 3000);
            loadBatches(); // refresh list
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data); // backend validation errors
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleEdit = (index) => {
        setFormData(batches[index]);
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        const batch = batches[index];
        if (!batch.id) {
            console.error("Batch has no ID:", batch);
            alert("Cannot delete this batch — missing ID.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete batch "${batch.course}"?`)) return;

        try {
            await deletedBatch(batch.id);
            setSuccessMsg("Batch deleted successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
            loadBatches();
        } catch (error) {
            console.error("Error deleting batch:", error);
            alert("Failed to delete batch. Please try again.");
        }
    };

    return (
        <div className="container mt-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {/* Page Heading */}
            <div className="text-center mb-4">
                <h1 className="d-flex justify-content-center align-items-center gap-2">
                    <FaClock style={{ color: '#00BFFF' }} /> Batch Schedule
                </h1>
            </div>

            {/* Success Message */}
            {successMsg && (
                <div
                    className="alert alert-success text-center fw-bold"
                    style={{ borderRadius: '10px' }}
                >
                    {successMsg}
                </div>
            )}

            <div className="row">
                {/* Left Side: Table */}
                <div className="col-12 col-md-7 mb-4">
                    <h3 className="text-white mb-3">Batches</h3>
                    <div className="table-responsive">
                        <table
                            className="table text-white table-bordered rounded shadow"
                            style={{
                                backgroundColor: '#2c3e50',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                fontWeight: 500,
                            }}
                        >
                            <thead style={{ fontWeight: 700 }}>
                                <tr>
                                    <th><FaHashtag style={{ color: '#FFD700', marginRight: '5px' }} />ID</th>
                                    <th><FaBook style={{ color: '#00FFFF', marginRight: '5px' }} />Course</th>
                                    <th><FaCalendarAlt style={{ color: '#FFA500', marginRight: '5px' }} />Date</th>
                                    <th><FaClock style={{ color: '#ADFF2F', marginRight: '5px' }} />Time</th>
                                    <th><FaEdit style={{ color: '#00BFFF', marginRight: '5px' }} />Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((batch, index) => (
                                    <tr key={batch.id || index}>
                                        <td>{index + 1}</td>
                                        <td>{batch.course}</td>
                                        <td>{batch.date}</td>
                                        <td>{batch.time}</td>
                                        <td className="d-flex flex-wrap gap-1">
                                            <button
                                                className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                                                onClick={() => handleEdit(index)}
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-12 col-md-5">
                    <h3 className="text-white mb-3">{editIndex !== null ? 'Edit Batch' : 'Add Batch'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-white fw-bold">Course</label>
                            <input
                                type="text"
                                name="course"
                                className={`form-control ${errors.course ? 'is-invalid' : ''}`}
                                value={formData.course}
                                onChange={handleChange}
                                placeholder="Enter course name"
                            />
                            {errors.course && <div className="text-danger mt-1">{errors.course}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white fw-bold">Date</label>
                            <input
                                type="date"
                                name="date"
                                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && <div className="text-danger mt-1">{errors.date}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white fw-bold">Time</label>
                            <input
                                type="time"
                                name="time"
                                className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                                value={formData.time}
                                onChange={handleChange}
                            />
                            {errors.time && <div className="text-danger mt-1">{errors.time}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100 fw-bold">
                            {editIndex !== null ? 'Update Batch' : 'Add Batch'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BatchComponent;
