import { t } from "i18next";
import { NotificationError } from "../../commons/Notification/index.jsx";
import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useOrderDetailAdmin = () => {
  const getOrderDetailAdmin = (id, onSuccess, onError) => {
    let response = orderAdminAPI.getOrderDetailAdmin(id);
    response
      .then((result) => {
        let { data } = result;
        onSuccess(data);
      })
      .catch((error) => {
        NotificationError("", `Error ${error.message}`);
      });
  };

  return {
    getOrderDetailAdmin,
  };
};

export default useOrderDetailAdmin;
