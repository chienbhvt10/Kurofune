import axios from "axios";
import { ROOT_URL } from "../constants/api";
import { getAccessToken, getCurrentLanguage } from "../helper/localStorage";

const axiosClient = axios.create({
  baseURL: ROOT_URL,
  headers: {
    "content-text": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const access_token = getAccessToken();
    const lang = getCurrentLanguage();
    if (access_token) {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        "X-localization": lang.replace("/", "") || "ja",
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
