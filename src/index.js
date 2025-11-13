import axios from "axios";

const API_BASE = "http://localhost:8080/api";
const NODE_API = `http://localhost:3001/upload`;
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/home";
};

export const createUser = (userData) => {
  return axios.post(`${API_BASE}/register`, userData);
};

export const createAdmin = (userData) => {
  return axios.post(`${API_BASE}/admin-register`, userData);
};

export const forgotPassword = (userData) => {
  return axios.post(`${API_BASE}/forgot-password`, userData);
};
export const getAllAboutContents = () => {
  return axios.get(`${API_BASE}/about-content`);
};

export const loginUser = (val) => {
  return axios.post(`${API_BASE}/login`, val);
};

export const loginAdmin = (userData) => {
  return axios.post(`${API_BASE}/admin-login`, userData);
};

export const getAllCourses = () => {
  return axios.get(`${API_BASE}/all-courses`);
};

export const findCourse = (courseId) => {
  return axios.get(`${API_BASE}/all-courses/${courseId}`);
};

export const addCourse = (course) => {
  return axios.post(`${API_BASE}/addcourse`, course);
};

export const updateCourse = (id, coureData) => {
  return axios.put(`${API_BASE}/updatecourse/${id}`, coureData);
};

export const searchCourse = (id) => {
  return axios.get(`${API_BASE}/find/${id}`);
};

export const addCourseContent = (value) => {
  return axios.post(`${API_BASE}/course-content/insert`, value);
};

export const searchCourseContent = (id) => {
  return axios.get(`${API_BASE}/course-content/find/${id}`);
};
export const search = (value) => {
  return axios.get(`${API_BASE}/search`, {
    params: { value: value }
  });
};

export const updateCourseContent = (id, coureData) => {
  return axios.put(`${API_BASE}/course-content/update/${id}`, coureData);
};

export const latestCourse = () => {
  return axios.get(`${API_BASE}/course-content/latest-course`);
};

export const insertFeesEnquiry = (value) => {
  return axios.post(`${API_BASE}/enquiry/insert`, value);
};

export const showAllFeesEnquiry = () => {
  return axios.get(`${API_BASE}/enquiry/show`);
};

export const searchDateEnquiry = (startDate, endDate) => {
  return axios.get(`${API_BASE}/enquiry/between-dates`, {
    params: { startDate, endDate }
  });
};

export const insertBatches = (value) => {
  return axios.post(`${API_BASE}/batches/insert`, value);
};

export const showAllBatches = () => {
  return axios.get(`${API_BASE}/batches`);
};

export const findBatch = (id) => {
  return axios.get(`${API_BASE}/batches/${id}`);
};
export const deletedBatch = (id) => {
  return axios.delete(`${API_BASE}/batches/${id}`);
};

export const updateBatch = (id, coureData) => {
  return axios.put(`${API_BASE}/batches/update/${id}`, coureData);
};
export const updatePassword = (updateData) => {
  return axios.put(`${API_BASE}/change-password`, updateData);
};

export const enquiryCountNotification = (startDate, endDate) => {
  return axios.get(`${API_BASE}/enquiry/count`, {
    params: { startDate, endDate }
  });
};

export const enquiryExportExcel = (startDate, endDate) => {
  return axios.get(`${API_BASE}/enquiry/export-between-dates`, {
    params: { startDate, endDate },
    responseType: 'blob',
  });
};

export const enquiryExportAll = () => {
  return axios.get(`${API_BASE}/enquiry/export`, {
    responseType: 'blob',
  });
};

export const showAllAbout = () => {
  return axios.get(`${API_BASE}/about/all`);
};

export const courseCount = () => {
  return axios.get(`${API_BASE}/countcourse`);
};
export const countAdmin = () => {
  return axios.get(`${API_BASE}/countAdmin`);
};
export const countStudents = () => {
  return axios.get(`${API_BASE}/countStudents`);
};

export const insertTestimonials = async (formData) => {
  const response = await axios.post(`${API_BASE}/testimonials/insert`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const moveImage = async (formData) => {
  const response = await axios.post('http://localhost:3001/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateTestimonial = (id, formData) => {
  const data = new FormData();
  for (let key in formData) {
    if (formData[key] !== null && formData[key] !== undefined) {
      data.append(key, formData[key]);
    }
  }

  return axios.put(`${API_BASE}/testimonials/update/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export const showAllTestimonials = () => {
  return axios.get(`${API_BASE}/testimonials/all`);
};

export const findTestimonials = (id) => {
  return axios.get(`${API_BASE}/testimonials/${id}`);
};