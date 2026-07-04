import axios from "axios";
// console.log(process.env.REACT_APP_API_URL);

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default API;
