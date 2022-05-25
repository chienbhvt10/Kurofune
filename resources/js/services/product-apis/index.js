import { ROOT_URL } from "../../constants/api";

export const productApis = {
  productClient: async (data) => {
    // const url = ROOT_URL + `detail-product/${data}`;
    const url = ROOT_URL + "detail-product";
    return await axiosClient.get(url, {
      params: {
        id: data.id,
      },
    });
  },
};
