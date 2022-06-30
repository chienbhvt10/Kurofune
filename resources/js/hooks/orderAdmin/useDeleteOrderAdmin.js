import { orderAdminAPI } from "../../services/order-admin-apis/index.js";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { NO_ERROR } from "../../constants/error";
import { t } from "i18next";
const useDeleteOrderAdmin = () => {
  const deleteOrderAdmin = (id, onSuccess, onError) => {
    let response = orderAdminAPI.deleteOrderAdmin(id);
    response
      .then((result) => {
        let { data } = result;
        onSuccess(data);
        if (result.NO_ERROR === NO_ERROR)
          NotificationSuccess(t("notification"), result.message);
      })
      .catch((error) => {
        NotificationError(t("notification"), `Update Error ${error.message}`);
      });
  };
  return {
    deleteOrderAdmin,
  };
};

export default useDeleteOrderAdmin;
