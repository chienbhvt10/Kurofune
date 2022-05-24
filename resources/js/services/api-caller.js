import axios from "axios";
import queryString from "query-string";
import { ROOT_URL } from "../constants/api";

// custom instance of axios
const axiosClient = axios.create({
  baseURL: ROOT_URL,
  headers: {
    "content-text": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
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
