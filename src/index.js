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