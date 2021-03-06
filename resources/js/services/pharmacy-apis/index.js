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
  pharmaciesAdmin: async () => {
    const url = ROOT_URL + "users?role=vendor";
    return await axiosClient.get(url);
  },
  searchPharmacy: async (data) => { return await axiosClient.get(ROOT_URL + `search-pharmacy?search=${data}`);},
  productPharmacy: async (data) => {
    const url = ROOT_URL + `product-of-pharmacy/${data}`;
    return await axiosClient.get(url)
  }
};
