import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useGetListOrderAdmin = () => {
  // const categoryState = useSelector((state) => state.adminCategoryState);
  // const { from, total, to, current_page, last_page } = useSelector(
  //   (state) => state.adminCategoryState
  // );

  const getListOrderAdmin = (onSuccess, onError) => {

    let respose =  orderAdminAPI.getListOrderAdmin();
    respose.then((result) => {
      let { data } = result
      console.log('data',data);
      onSuccess(data)
    }).catch((error) => {
      console.log('error', error);
    })

  };

  return {
    getListOrderAdmin
  }
}

export default useGetListOrderAdmin;
