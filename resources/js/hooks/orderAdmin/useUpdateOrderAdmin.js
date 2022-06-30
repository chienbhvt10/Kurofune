import { orderAdminAPI } from "../../services/order-admin-apis/index.js";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { t } from "i18next";
const useUpdateOrderAdmin = () => {
  const updateOrderAdmin = (payload, onSuccess, onError) => {
    let response = orderAdminAPI.updateOrderAdmin(payload.id, payload.data);

    response
      .then((result) => {
        let { data } = result;
        onSuccess(data);
        if (result.status_code === 200) NotificationSuccess("", result.message);
      })
      .catch((error) => {
        NotificationError("", error.response.data.error_message);
      });
  };
  return {
    updateOrderAdmin,
  };
};

export default useUpdateOrderAdmin;
