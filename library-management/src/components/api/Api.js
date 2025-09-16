import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {

    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error("Lỗi 401: Chưa đăng nhập hoặc token hết hạn");
      } else if (status === 403) {
        console.error("Lỗi 403: Không có quyền truy cập");
      } else if (status >= 500) {
        console.error("Lỗi server, thử lại sau");
      }
    }
    return Promise.reject(error);
  }
);

export default api;

