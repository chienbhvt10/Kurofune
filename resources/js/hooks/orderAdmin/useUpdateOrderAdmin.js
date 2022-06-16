import { orderAdminAPI } from "../../services/order-admin-apis/index.js";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { t } from "i18next";
const useUpdateOrderAdmin = () => {

  const updateOrderAdmin = (payload,onSuccess, onError) => {
    let respose =  orderAdminAPI.updateOrderAdmin(payload.id,payload.data)

    respose.then((result) => {
      let { data } = result;
      onSuccess(data)
      console.log(result);
      if(result.status_code===200) NotificationSuccess(t("notification"), result.message);
      
    }).catch((error) => {
      NotificationError(t("notification"), `Update Error ${error.message}` );
    })
  };
  return {
    updateOrderAdmin
  }
}

export default useUpdateOrderAdmin;
