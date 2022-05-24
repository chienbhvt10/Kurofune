import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const pharmacyApi = {
  pharmacies: async (data) => {
    const url = ROOT_URL + "list-of-pharmacies";
    return await axiosClient.get(url);
  },
  pharmacy: async (data) => {
    const url = ROOT_URL + `detail-pharmacy/${data}`;
    return await axiosClient.get(url);
  },
};
