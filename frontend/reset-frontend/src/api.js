import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5004/api/auth",
  baseURL: process.env.REACT_APP_API_URL,
});

export default API;
