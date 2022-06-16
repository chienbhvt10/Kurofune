import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useOrderDetailAdmin = () => {

  const getOrderDetailAdmin = (id,onSuccess, onError) => {
    let respose =  orderAdminAPI.getOrderDetailAdmin(id);
    respose.then((result) => {
      let { data } = result
      onSuccess(data)
    }).catch((error) => {
      console.log('error', error);
    })

  };

  return {
    getOrderDetailAdmin
  }
}

export default useOrderDetailAdmin;
