// Tất cả các api đều phải đi qua axios client
import axios from "axios";
import { ROOT_URL } from "../constants/api";
// custom instance of axios
const axiosClient = axios.create({
  baseURL: ROOT_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
