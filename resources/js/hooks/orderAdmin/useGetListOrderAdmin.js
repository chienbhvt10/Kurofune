import { t } from "i18next";
import { useState } from "react";
import { NotificationError } from "../../commons/Notification/index.jsx";
import { orderAdminAPI } from "../../services/order-admin-apis/index.js";

const useGetListOrderAdmin = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 0,
    last_page: 0,
  });
  const getListOrderAdmin = async (payload=null,onSuccess, onError) => {
    if (!payload) await orderAdminAPI.getListOrderAdminNotData().then((result) => {
      let { data } = result
      let page = {
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
      }
      onSuccess(data)
      setPagination(page)
    })
    await orderAdminAPI.getListOrderAdmin(payload).then((result) => {
      let { data } = result
      onSuccess(data)
      let page = {
        total: data.total,
        current_page: data.current_page,
        last_page: data.last_page,
      }
      setPagination(page)
    }).catch((error) => {
      NotificationError(t("notification"), `Error ${error.message}` );
    })
  };
  return {
    getListOrderAdmin,
    pagination
  }
}

export default useGetListOrderAdmin;
