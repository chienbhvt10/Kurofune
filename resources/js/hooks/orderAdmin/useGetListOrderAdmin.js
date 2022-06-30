import { t } from "i18next";
import { NotificationError } from "../../commons/Notification/index.jsx";
import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useGetListOrderAdmin = () => {
  const getListOrderAdmin = async (payload=null,onSuccess, onError) => {
    await orderAdminAPI.getListOrderAdmin(payload).then((result) => {
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
