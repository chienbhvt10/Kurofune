import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useOrderDetailAdmin = () => {
  // const categoryState = useSelector((state) => state.adminCategoryState);
  // const { from, total, to, current_page, last_page } = useSelector(
  //   (state) => state.adminCategoryState
  // );

  const getOrderDetailAdmin = (id,onSuccess, onError) => {
    console.log(id);
    let respose =  orderAdminAPI.getOrderDetailAdmin(id);
    respose.then((result) => {
      let { data } = result
      console.log('result', result);
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
