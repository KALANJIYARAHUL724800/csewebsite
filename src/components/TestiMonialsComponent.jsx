import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import {
	insertTestimonials,
	updateTestimonial,
	getAllCourses,
	findTestimonials,
} from "../index";
import { useNavigate } from "react-router-dom";

const TestiMonialsComponent = () => {
	const navigate = useNavigate();
	const [courseOptions, setCourseOptions] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		enrollno: "",
		image: null,
		courseName: "",
		place: "",
		text: "",
		imageUrl: "",
	});

	const fileInputRef = useRef(null);
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const res = await getAllCourses();
				if (res && res.data) {
					const options = res.data.map((c) => ({
						value: c.id || c.courseName,
						label: c.courseName,
					}));
					setCourseOptions(options);
				}
			} catch (error) {
				console.error("Fetch course error:", error);
			}
		};
		fetchCourses();
	}, []);

	// Fetch Testimonial Details by Enroll No
	const handleFetchTestimonial = async () => {
		if (!formData.enrollno) {
			setErrors({ enrollno: "Please enter Enroll No" });
			return;
		}

		try {
			const res = await findTestimonials(formData.enrollno);

			if (res && res.data) {
				const data = res.data;
				const fetchedCourseName =
					data.courseName || data.coursename || data.course || "";

				setFormData((prev) => ({
					...prev,
					name: data.name || "",
					courseName: String(fetchedCourseName).trim(),
					place: data.place || "",
					text: data.text || "",
					imageUrl: data.imageUrl || data.imageurl || "",
					image: null, // Clear file object on fetch
				}));

				setErrors({});
				setSuccessMessage("Details loaded successfully!");
			} else {
				setErrors({ enrollno: "No record found for this Enroll No" });
			}
		} catch (error) {
			console.error("Fetch error:", error);
			setErrors({ enrollno: "Record not found" });
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleFetchTestimonial();
		}
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "image") {
			const selectedFile = files && files.length > 0 ? files[0] : null;
			setFormData((prev) => ({
				...prev,
				image: selectedFile, // Real File object
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSelectChange = (selectedOption) => {
		setFormData((prev) => ({
			...prev,
			courseName: selectedOption ? selectedOption.label : "",
		}));
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name?.trim()) newErrors.name = "Name is required";
		if (!formData.enrollno)
			newErrors.enrollno = "Enrollment Number is required";
		if (!formData.courseName) newErrors.courseName = "Please select a course";
		if (!formData.place?.trim()) newErrors.place = "Place is required";
		if (!formData.text?.trim()) newErrors.text = "Testimonial text is required";

		// Allow submission if EITHER new image is chosen OR an existing image URL exists
		if (!formData.image && !formData.imageUrl) {
			newErrors.image = "Image is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Image Upload Processor
	const processImageUpload = async () => {
		let finalUrl = formData.imageUrl; // Default to existing URL

		// Upload ONLY IF user picked a new file from file picker
		if (formData.image instanceof File) {
			const reader = new FileReader();
			const base64Data = await new Promise((resolve, reject) => {
				reader.onload = () => resolve(reader.result);
				reader.onerror = (err) => reject(err);
				reader.readAsDataURL(formData.image);
			});

			const uploadRes = await fetch("/api/move-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fileName: formData.image.name,
					base64Data: base64Data,
				}),
			});

			const uploadData = await uploadRes.json();

			if (uploadData.success || uploadData.url) {
				finalUrl = uploadData.url || uploadData.imageUrl || uploadData.path;
			}
		}

		return finalUrl;
	};

	// Construct Data Object
	const preparePayload = (uploadedImageUrl) => {
		return {
			name: formData.name,
			enrollno: String(formData.enrollno),
			courseName: formData.courseName,
			place: formData.place,
			text: formData.text,
			imageUrl: uploadedImageUrl,
		};
	};

	// 1. INSERT FUNCTION
	const handleInsert = async (e) => {
		e.preventDefault();
		if (isSubmitting || !validateForm()) return;

		setIsSubmitting(true);
		try {
			const finalImageUrl = await processImageUpload();
			const payload = preparePayload(finalImageUrl);

			await insertTestimonials(payload);

			setSuccessMessage("Testimonial submitted successfully!");
			resetForm();
		} catch (error) {
			handleError(error);
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSuccessMessage(""), 5000);
		}
	};

	// 2. UPDATE FUNCTION
	const handleUpdate = async (e) => {
		e.preventDefault();
		if (isSubmitting || !validateForm()) return;

		setIsSubmitting(true);
		try {
			const finalImageUrl = await processImageUpload();
			const payload = preparePayload(finalImageUrl);

			// Explicitly calls updateTestimonial
			await updateTestimonial(formData.enrollno, payload);

			setSuccessMessage("Testimonial updated successfully!");
			resetForm();
		} catch (error) {
			handleError(error);
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSuccessMessage(""), 5000);
		}
	};

	const resetForm = () => {
		setFormData({
			name: "",
			enrollno: "",
			image: null,
			courseName: "",
			place: "",
			text: "",
			imageUrl: "",
		});
		if (fileInputRef.current) fileInputRef.current.value = null;
	};

	const handleError = (error) => {
		if (error.response && error.response.status === 400) {
			setErrors(error.response.data);
		} else {
			console.error("Submission error:", error);
		}
	};

	const customSelectStyles = {
		control: (provided, state) => ({
			...provided,
			borderColor: errors.courseName ? "#dc3545" : provided.borderColor,
			boxShadow: state.isFocused
				? errors.courseName
					? "0 0 0 1px #dc3545"
					: "0 0 0 1px #2684FF"
				: null,
		}),
	};

	const getSelectedCourseOption = () => {
		if (!formData.courseName) return null;
		return (
			courseOptions.find(
				(option) =>
					String(option.label).trim().toLowerCase() ===
					String(formData.courseName).trim().toLowerCase(),
			) || { label: formData.courseName, value: formData.courseName }
		);
	};

	return (
		<div className="container my-5">
			<button
				className="btn btn-outline-secondary mb-3"
				onClick={() => navigate("/dashboard")}>
				<i className="bi bi-arrow-left"></i> Go Back
			</button>
			<h2 className="mb-4 text-center heading" style={{ color: "#004aad" }}>
				Testimonial Form
			</h2>

			<form className="mx-auto" style={{ maxWidth: "600px" }}>
				{/* Enroll No Input */}
				<div className="mb-3">
					<label htmlFor="enrollno" className="form-label heading">
						Enroll No <i className="bi bi-person-fill ms-2"></i>
					</label>
					<div className="input-group">
						<input
							type="number"
							id="enrollno"
							name="enrollno"
							value={formData.enrollno}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							className={`form-control para ${
								errors.enrollno ? "is-invalid" : ""
							}`}
							placeholder="Enter enroll no & press Enter"
						/>
						<button
							type="button"
							className="btn btn-outline-primary"
							onClick={handleFetchTestimonial}>
							<i className="bi bi-search"></i> Fetch
						</button>
					</div>
					{errors.enrollno && (
						<div className="invalid-feedback para d-block">
							{errors.enrollno}
						</div>
					)}
				</div>

				{/* Name */}
				<div className="mb-3">
					<label htmlFor="name" className="form-label heading">
						Name <i className="bi bi-person-fill ms-2"></i>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`form-control para ${errors.name ? "is-invalid" : ""}`}
						placeholder="Enter your name"
					/>
					{errors.name && (
						<div className="invalid-feedback para">{errors.name}</div>
					)}
				</div>

				{/* Image File Input */}
				<div className="mb-3">
					<label htmlFor="image" className="form-label heading">
						Image <i className="bi bi-image-fill ms-2"></i>
					</label>
					<input
						type="file"
						id="image"
						name="image"
						onChange={handleChange}
						className={`form-control para ${errors.image ? "is-invalid" : ""}`}
						accept="image/*"
						ref={fileInputRef}
					/>
					{formData.imageUrl && !formData.image && (
						<small className="text-muted d-block mt-1">
							Current DB Image: <strong>{formData.imageUrl}</strong>
						</small>
					)}
					{errors.image && (
						<div className="invalid-feedback para d-block">{errors.image}</div>
					)}
				</div>

				{/* Course Select Dropdown */}
				<div className="mb-3">
					<label htmlFor="courseName" className="form-label heading">
						Course Name <i className="bi bi-journal-bookmark-fill ms-2"></i>
					</label>
					<Select
						id="courseName"
						options={courseOptions}
						value={getSelectedCourseOption()}
						onChange={handleSelectChange}
						placeholder="Select a course"
						isClearable
						styles={customSelectStyles}
					/>
					{errors.courseName && (
						<div
							className="para"
							style={{
								color: "#dc3545",
								marginTop: "0.25rem",
								fontSize: "0.875em",
							}}>
							{errors.courseName}
						</div>
					)}
				</div>

				{/* Place */}
				<div className="mb-3">
					<label htmlFor="place" className="form-label heading">
						Place <i className="bi bi-geo-alt-fill ms-2"></i>
					</label>
					<input
						type="text"
						id="place"
						name="place"
						value={formData.place}
						onChange={handleChange}
						className={`form-control para ${errors.place ? "is-invalid" : ""}`}
						placeholder="Enter your place"
					/>
					{errors.place && (
						<div className="invalid-feedback para">{errors.place}</div>
					)}
				</div>

				{/* Testimonial Text */}
				<div className="mb-4">
					<label htmlFor="text" className="form-label heading">
						Testimonial <i className="bi bi-chat-left-text-fill ms-2"></i>
					</label>
					<textarea
						id="text"
						name="text"
						value={formData.text}
						onChange={handleChange}
						className={`form-control para ${errors.text ? "is-invalid" : ""}`}
						rows="4"
						placeholder="Write your testimonial here"
					/>
					{errors.text && (
						<div className="invalid-feedback para">{errors.text}</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="d-flex gap-3 mb-3">
					<button
						type="button"
						disabled={isSubmitting}
						onClick={handleInsert}
						className="btn btn-primary btn-lg flex-fill">
						Submit Testimonial <i className="bi bi-send-fill ms-2"></i>
					</button>
					<button
						type="button"
						disabled={isSubmitting}
						onClick={handleUpdate}
						className="btn btn-success btn-lg flex-fill">
						Update Testimonial <i className="bi bi-pencil-square ms-2"></i>
					</button>
				</div>
			</form>

			{/* Success Message */}
			{successMessage && (
				<div className="alert alert-success text-center para" role="alert">
					{successMessage}
				</div>
			)}
		</div>
	);
};

export default TestiMonialsComponent;
