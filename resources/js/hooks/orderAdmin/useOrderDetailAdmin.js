import { t } from "i18next";
import { NotificationError } from "../../commons/Notification/index.jsx";
import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useOrderDetailAdmin = () => {

  const getOrderDetailAdmin = (id,onSuccess, onError) => {
    let respose =  orderAdminAPI.getOrderDetailAdmin(id);
    respose.then((result) => {
      let { data } = result
      onSuccess(data)
    }).catch((error) => {
      NotificationError(t("notification"), `Error ${error.message}` );
    })

  };

  return {
    getOrderDetailAdmin
  }
}

export default useOrderDetailAdmin;
