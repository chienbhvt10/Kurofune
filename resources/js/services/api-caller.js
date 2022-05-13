import axios from "axios";
import { ROOT_URL } from "../constants/api";
const access_token = localStorage.getItem("access_token");
// custom instance of axios
const axiosClient = axios.create({
  baseURL: ROOT_URL,
  headers: {
    Authorization: `Bearer ${access_token}`,
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