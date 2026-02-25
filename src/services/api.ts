import axios from "axios";

const api = axios.create({
  baseURL: "http://10.193.91.197:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000000,
});

export default api;
