import axios from "axios";

const api = axios.create({
  baseURL: "http://10.95.11.178:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
