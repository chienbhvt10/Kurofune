import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useDeleteOrderAdmin = () => {

  const deleteOrderAdmin = (id,onSuccess, onError) => {
    console.log('id',id);
    let respose =  orderAdminAPI.deleteOrderAdmin(id)
    respose.then((result) => {
      let { data } = result;
      onSuccess(data)
    }).catch((error) => {
      console.log('error', error);
    })
  };
  return {
    deleteOrderAdmin
  }
}

export default useDeleteOrderAdmin;
