import { t } from "i18next";
import { NotificationError } from "../../commons/Notification/index.jsx";
import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useGetListOrderAdmin = () => {
  // const categoryState = useSelector((state) => state.adminCategoryState);
  // const { from, total, to, current_page, last_page } = useSelector(
  //   (state) => state.adminCategoryState
  // );

  const getListOrderAdmin = (payload=null,onSuccess, onError) => {
    let respose =  orderAdminAPI.getListOrderAdmin(payload);
    respose.then((result) => {
      let { data } = result
      onSuccess(data)
    }).catch((error) => {
      NotificationError(t("notification"), `Error ${error.message}` );
    })
  };
  return {
    getListOrderAdmin
  }
}

export default useGetListOrderAdmin;
