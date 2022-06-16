import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useUpdateOrderAdmin = () => {

  const updateOrderAdmin = (payload,onSuccess, onError) => {
    let respose =  orderAdminAPI.updateOrderAdmin(payload.id,payload.data)

    respose.then((result) => {
      let { data } = result;
      onSuccess(data)
    }).catch((error) => {
      console.log('error', error);
    })
  };
  return {
    updateOrderAdmin
  }
}

export default useUpdateOrderAdmin;
