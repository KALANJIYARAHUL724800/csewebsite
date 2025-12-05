import React, { useState, useEffect } from "react";
import { getAllCourses, addCourse, updateCourse, searchCourse, uploadCoursePdf } from "../index";
import { useNavigate } from "react-router-dom";

const AddCourseComponent = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleUpload = async (e, courseId) => {
    const file = e.target.files[0];
    if (!file) {
      setErrorMessage("Please select a file first!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    try {
      const res = await uploadCoursePdf(courseId, file);
      setSuccessMessage("PDF uploaded successfully!");
    } catch (err) {
      setErrorMessage("Upload failed!");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formType, setFormType] = useState(null);
  const [insertData, setInsertData] = useState({
    courseName: "",
    logoUrl: "",
    courseContent: "",
    month: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    courseName: "",
    logoUrl: "",
    courseContent: "",
    month: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInsertChange = (e) => {
    const { name, value } = e.target;
    setInsertData({ ...insertData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleInsertSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await addCourse(insertData);
      const newCourse = response.data;

      setCourses([...courses, newCourse]);
      setInsertData({ courseName: "", logoUrl: "", courseContent: "", month: "" });
      setFormType(null);

      const courseContent = (await searchCourse(newCourse.id)).data;
      navigate("/addcoursecontent", { state: { courseContentData: courseContent } });
    } catch (error) {
      const backendMessage = error.response?.data;
      if (backendMessage) {
        const fieldErrors = {};
        backendMessage.split(";").forEach((err) => {
          const [field, message] = err.split(":").map((s) => s.trim());
          if (field && message) fieldErrors[field] = message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Insert failed:", error.message);
      }
    }
  };

  const handleEdit = (course) => {
    setUpdateData(course);
    setFormType("update");
    setErrors({});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  function handleUpdateContent(id) {
    navigate(`/addcoursecontent/${id}`);
  }
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setCourses(courses.map((c) => (c.id === updateData.id ? updateData : c)));
    setFormType(null);
    try {
      await updateCourse(updateData.id, updateData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const renderInput = (label, name, value, onChange) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const renderTextarea = (label, name, value, onChange) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        name={name}
        rows="2"
        value={value}
        onChange={onChange}
      ></textarea>
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-4">
      <button class="btn btn-outline-secondary" onClick={()=>{navigate("/dashboard")}}>
        <i class="bi bi-arrow-left"></i> Go Back
      </button>
      <h3 className="text-center mb-4 heading" style={{ color: "#004aad" }}>Course Details</h3>
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {errorMessage}
        </div>
      )}
      {!formType && (
        <>
          <div className="table-responsive d-flex justify-content-center">
            <table
              className="table table-bordered w-75 text-center align-middle"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "10px",
                width: "90%",
                wordWrap: "break-word",
              }}
            >
              <thead className="table-dark">
                <tr className="para">
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Logo URL</th>
                  <th>Content</th>
                  <th>Month</th>
                  <th>Actions</th>
                  <th>Update Content</th>
                  <th>Upload Pdf</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr className="para" key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.courseName}</td>
                    <td>
                      {course.logoUrl ? (
                        <img
                          src={course.logoUrl}
                          alt="Course Logo"
                          style={{
                            width: "100px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#ccc" }}>No Logo</span>
                      )}
                    </td>
                    <td>{course.courseContent}</td>
                    <td>{course.month}</td>
                    <td>
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "10px" }}
                      >
                        <button
                          className="btn btn-sm"
                          onClick={() => handleEdit(course)}
                          style={{
                            backgroundColor: "#0d6efd",
                            color: "white",
                            borderRadius: "6px",
                            width: "60px",
                          }}
                        >
                          Edit
                        </button>
                        <div
                          style={{
                            width: "2px",
                            height: "35px",
                            backgroundColor: "#0d6efd",
                          }}
                        ></div>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDelete(course.id)}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            borderRadius: "6px",
                            width: "70px",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleUpdateContent(course.id)}>Update Content</button>
                    </td>
                    <td>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id={`fileInput-${course.id}`}
                        onChange={(e) => handleUpload(e, course.id)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => document.getElementById(`fileInput-${course.id}`).click()}
                      >
                        <i className="bi bi-upload"></i> Upload PDF
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4 heading">
            <button className="btn btn-success" onClick={() => setFormType("insert")}>
              + Add New Course
            </button>
          </div>
          <br />
        </>
      )}

      {formType && (
        <div className="d-flex justify-content-center mt-5">
          <div
            className="position-relative p-4 rounded shadow w-50"
            style={{
              backgroundColor: formType === "update" ? "#e8f0ff" : "#e9f7ef",
            }}
          >
            <button
              onClick={() => setFormType(null)}
              className="btn-close position-absolute top-0 end-0 m-3"
            ></button>

            {formType === "insert" ? (
              <>
                <h5 className="text-center mb-3 heading">Insert Course</h5>
                <form onSubmit={handleInsertSubmit} className="para">
                  {renderInput("Course Name", "courseName", insertData.courseName, handleInsertChange)}
                  {renderInput("Logo URL", "logoUrl", insertData.logoUrl, handleInsertChange)}
                  {renderTextarea("Course Content", "courseContent", insertData.courseContent, handleInsertChange)}
                  {renderInput("Month", "month", insertData.month, handleInsertChange)}
                  <button className="btn btn-success w-100" type="submit">
                    Insert
                  </button>
                </form>
              </>
            ) : (
              <>
                <h5 className="text-center mb-3 heading">Edit Course</h5>
                <form onSubmit={handleUpdateSubmit} className="para">
                  {renderInput("Course Name", "courseName", updateData.courseName, handleUpdateChange)}
                  {renderInput("Logo URL", "logoUrl", updateData.logoUrl, handleUpdateChange)}
                  {renderTextarea("Course Content", "courseContent", updateData.courseContent, handleUpdateChange)}
                  {renderInput("Month", "month", updateData.month, handleUpdateChange)}
                  <button className="btn btn-primary w-100" type="submit">
                    Update
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseComponent;
