import axios from "axios";

const baseURL = "https://back-end-teste-facilita-system.vercel.app/";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

export default api;
