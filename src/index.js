import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const createUser = (userData) => {
  return axios.post(`${API_BASE}/register`, userData);
};

export const forgotPassword = (userData) => {
  return axios.post(`${API_BASE}/forgot-password`, userData);
};
export const getAllAboutContents = () => {
  return axios.get(`${API_BASE}/about-content`);
};

export const loginUser = () => {
  return axios.get(`${API_BASE}/login`);
};

export const getAllCourses = () => {
  return axios.get(`${API_BASE}/all-courses`);
};

export const findCourse = (courseId) => {
  return axios.get(`${API_BASE}/all-courses/${courseId}`);
};