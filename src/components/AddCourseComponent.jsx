import React, { useState, useEffect } from "react";
import { getAllCourses, addCourse, updateCourse } from "../index";

const AddCourseComponent = () => {
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

  useEffect(() => {
    getAllCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => { });
  }, []);

  const handleInsertChange = (e) => {
    const { name, value } = e.target;
    setInsertData({ ...insertData, [name]: value });
  };

  const handleInsertSubmit = async (e) => {
    e.preventDefault();
    const newId = courses.length + 1;
    const newCourse = { id: newId, ...insertData };
    setCourses([...courses, newCourse]);
    setInsertData({ courseName: "", logoUrl: "", courseContent: "", month: "" });
    setFormType(null);
    try {
      await addCourse(newCourse);
    } catch (error) {
    }
  };

  const handleEdit = (course) => {
    setUpdateData(course);
    setFormType("update");
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setCourses(courses.map((c) => (c.id === updateData.id ? updateData : c)));
    setFormType(null);
    try {
      await updateCourse(updateData.id, updateData);
    } catch (error) {
    }
  };
  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };
  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Course Details</h3>
      {!formType && (
        <>
          <div className="table-responsive d-flex justify-content-center">
            <table
              className="table table-bordered w-75 text-center align-middle"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "10px",
              }}
            >
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Logo URL</th>
                  <th>Content</th>
                  <th>Month</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.courseName}</td>
                    <td>{course.logoUrl}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-success"
              onClick={() => setFormType("insert")}
            >
              + Add New Course
            </button>
          </div>
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
                <h5 className="text-center mb-3">Insert Course</h5>
                <form onSubmit={handleInsertSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="courseName"
                      value={insertData.courseName}
                      onChange={handleInsertChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Logo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="logoUrl"
                      value={insertData.logoUrl}
                      onChange={handleInsertChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course Content</label>
                    <textarea
                      className="form-control"
                      name="courseContent"
                      rows="2"
                      value={insertData.courseContent}
                      onChange={handleInsertChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Month</label>
                    <input
                      type="text"
                      className="form-control"
                      name="month"
                      value={insertData.month}
                      onChange={handleInsertChange}
                    />
                  </div>
                  <button className="btn btn-success w-100" type="submit">
                    Insert
                  </button>
                </form>
              </>
            ) : (
              <>
                <h5 className="text-center mb-3">Edit Course</h5>
                <form onSubmit={handleUpdateSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="courseName"
                      value={updateData.courseName}
                      onChange={handleUpdateChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Logo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="logoUrl"
                      value={updateData.logoUrl}
                      onChange={handleUpdateChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course Content</label>
                    <textarea
                      className="form-control"
                      name="courseContent"
                      rows="2"
                      value={updateData.courseContent}
                      onChange={handleUpdateChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Month</label>
                    <input
                      type="text"
                      className="form-control"
                      name="month"
                      value={updateData.month}
                      onChange={handleUpdateChange}
                    />
                  </div>
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
