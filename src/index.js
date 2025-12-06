import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  localStorage.removeItem("email");
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

export const insertFeesEnquiryTemp = (value) => {
  return axios.post(`${API_BASE}/enquiry/insert-enquiry`, value);
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
export const updateTestimonials = async (formData) => {
  const response = await axios.post(`${API_BASE}/testimonials/insert`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const moveImage = async (formData, type = "upload") => {
  const url = new URL(API_BASE);
  url.port = "3001";
  if (type === "post") url.pathname = "/upload-post";
  else if (type === "profile") url.pathname = "/upload-profile";
  else url.pathname = "/upload";

  const response = await axios.post(url.toString(), formData, {
    headers: { "Content-Type": "multipart/form-data" },
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
  return axios.get(`${API_BASE}/testimonials/find/${id}`);
};

export const insertPost = (value) => {
  return axios.post(`${API_BASE}/posts/insert`, value);
};

export const showAllPosts = () => {
  return axios.get(`${API_BASE}/posts/all`);
};

export const updateLikes = (id, payload) => {
  return axios.put(`${API_BASE}/comments/likes/update`, payload, {
    params: { id }
  });
};

export const getTotalLikes = (postId) => {
  return axios.get(`${API_BASE}/comments/${postId}/likes/total`);
};

export const uploadCoursePdf = (courseId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.put(`${API_BASE}/courses/${courseId}/upload-pdf`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const downloadCoursePdf = (courseId) => {
  return axios.get(`${API_BASE}/courses/${courseId}/pdf`, {
    responseType: "blob",
  });
};

export const insertComment = (id, value) => {
  return axios.post(`${API_BASE}/comments/insert/${id}`, value);
};

export const insertProfile = (value) => {
  return axios.post(`${API_BASE}/profile/insert`, value);
};

export const getEmailData = (email) => {
  return axios.get(`${API_BASE}/getdata/${email}`);
};

export const updateUserRecord = (email, data) => {
  return axios.put(`${API_BASE}/update-record/${email}`, data);
};

export const getStudentsDetails = () => {
  return axios.get(`${API_BASE}/students-details`);
};