import axiosClient from "../api-caller";

export const cartApis = {
  getCartInfo: async () => {
    const url = "cart";
    return await axiosClient.get(url);
  },
  updateCart: async (data) => {
    const url = "update-cart";
    return await axiosClient.put(url, data);
  },
  deleteCart: async () => {
    const url = "delete-cart";
    return await axiosClient.delete(url);
  },
  addToCart: async (data) => {
    const url = "add-to-cart";
    return await axiosClient.post(url, data);
  },
  deleteCartItem: async (id) => {
    const url = `delete-cart-item/${id}`;
    return await axiosClient.delete(url);
  },
  checkout: async (payload) => {
    const url = "checkout";
    return await axiosClient.post(url, payload);
  },
};
