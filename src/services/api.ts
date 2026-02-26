import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.214:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000000,
});

export default api;
