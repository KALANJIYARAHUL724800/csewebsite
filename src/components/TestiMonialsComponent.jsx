import React, { useState,useRef } from 'react';
import Select from 'react-select';
import { insertTestimonials,moveImage } from "../index";

const TestiMonialsComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        courseName: '',
        place: '',
        text: '',
    });
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const allCourses = [
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Cyber Security', label: 'Cyber Security' },
    ];
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                image: files && files.length > 0 ? files[0] : null
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            courseName: selectedOption ? selectedOption.value : '',
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); 
    
        try {
            let imageUrl = '';
            if (formData.image) {
                const imageForm = new FormData();
                imageForm.append('image', formData.image);
                const uploadRes = await moveImage(imageForm); 
                imageUrl = uploadRes.url; 
            }
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('courseName', formData.courseName);
            payload.append('place', formData.place);
            payload.append('text', formData.text);
            if (imageUrl) payload.append('image', imageUrl); 
            await insertTestimonials(payload);
            setSuccessMessage('Thank you! Your testimonial has been submitted successfully.');
            setFormData({
                name: '',
                image: null,
                courseName: '',
                place: '',
                text: '',
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error('Error submitting testimonial:', error);
            }
        }
    
        setTimeout(() => setSuccessMessage(''), 5000);
    };
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: errors.courseName ? 'red' : provided.borderColor,
            boxShadow: state.isFocused
                ? errors.courseName
                    ? '0 0 0 1px red'
                    : '0 0 0 1px #2684FF'
                : null,
        }),
    };
    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Testimonial Form</h2>

            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
                {/* Name input */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name <i className="bi bi-person-fill ms-2"></i>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Image input */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image <i className="bi bi-image-fill ms-2"></i>
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                </div>

                {/* Course Name select */}
                <div className="mb-3">
                    <label htmlFor="courseName" className="form-label">
                        Course Name <i className="bi bi-journal-bookmark-fill ms-2"></i>
                    </label>
                    <Select
                        id="courseName"
                        options={allCourses}
                        value={allCourses.find(c => c.value === formData.courseName) || null}
                        onChange={handleSelectChange}
                        placeholder="Select a course"
                        isClearable
                        styles={customSelectStyles}
                    />
                    {errors.courseName && <div style={{ color: 'red', marginTop: '0.25rem' }}>{errors.courseName}</div>}
                </div>

                {/* Place input */}
                <div className="mb-3">
                    <label htmlFor="place" className="form-label">
                        Place <i className="bi bi-geo-alt-fill ms-2"></i>
                    </label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        className={`form-control ${errors.place ? 'is-invalid' : ''}`}
                        placeholder="Enter your place"
                    />
                    {errors.place && <div className="invalid-feedback">{errors.place}</div>}
                </div>

                {/* Testimonial textarea */}
                <div className="mb-4">
                    <label htmlFor="text" className="form-label">
                        Testimonial <i className="bi bi-chat-left-text-fill ms-2"></i>
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        className={`form-control ${errors.text ? 'is-invalid' : ''}`}
                        rows="4"
                        placeholder="Write your testimonial here"
                    />
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                </div>

                {/* Submit button */}
                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Submit Testimonial <i className="bi bi-send-fill ms-2"></i>
                    </button>
                </div>
            </form>

            {/* Success message */}
            {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default TestiMonialsComponent;
