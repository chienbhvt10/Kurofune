import { ROOT_URL } from "../../constants/api";
import axiosClient from "../api-caller";

export const productApis = {
  productClient: async (data) => {
    const url = ROOT_URL + `detail-product/${data.id}`;
    return await axiosClient.get(url);
  },
  addToCartClient: async (data) => {
    const url = ROOT_URL + "add-to-cart";
    return await axiosClient.post(url, data);
  },
};
