import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { insertTestimonials, moveImage, getAllCourses } from "../index";

const TestiMonialsComponent = () => {
    const [course, setCourse] = new useState(null)
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getAllCourses();
                const options = res.data.map(c => ({
                    value: c.id,
                    label: c.courseName
                }));
                setCourse(options);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        enrollno: '',
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
        if (name === "image") {
            const selectedFile = files && files.length > 0 ? files[0] : null;
            setFormData((prev) => ({
                ...prev,
                image: selectedFile,
                imageUrl: selectedFile ? selectedFile.name : "",
            }));
            if (selectedFile) console.log();
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
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
        if (isSubmitting) return;
        setIsSubmitting(true);
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
            payload.append('enrollno', formData.enrollno);
            payload.append('courseName', formData.courseName);
            payload.append('place', formData.place);
            payload.append('text', formData.text);
            payload.append('imageUrl', formData.imageUrl || '');
            if (imageUrl) payload.append('image', imageUrl);
            await insertTestimonials(payload);
            setSuccessMessage('Thank you! Your testimonial has been submitted successfully.');
            setFormData({
                name: '',
                enrollno: '',
                image: null,
                courseName: '',
                place: '',
                text: '',
                imageUrl: '',
            });
            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSuccessMessage(''), 5000);
        }
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
                <div className="mb-3">
                    <label htmlFor="enrollno" className="form-label">
                        Enroll No <i className="bi bi-person-fill ms-2"></i>
                    </label>
                    <input
                        type="number"
                        id="enrollno"
                        name="enrollno"
                        value={formData.enrollno}
                        onInput={(e) => {
                            if (e.target.value.length > 6) {
                                e.target.value = e.target.value.slice(0, 6);
                            }
                            handleChange(e);
                        }}
                        className={`form-control ${errors.enrollno ? "is-invalid" : ""}`}
                        placeholder="Enter enroll no"
                    />

                    {errors.enrollno && <div className="invalid-feedback">{errors.enrollno}</div>}
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
                <input type="hidden" name="imageUrl" value={formData.imageUrl || ''} />
                {/* Course Name select */}
                <div className="mb-3">
                    <label htmlFor="courseName" className="form-label">
                        Course Name <i className="bi bi-journal-bookmark-fill ms-2"></i>
                    </label>
                    <Select
                        id="courseName"
                        options={course}
                        value={course?.find(c => c.value === formData.courseName) || null}
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
