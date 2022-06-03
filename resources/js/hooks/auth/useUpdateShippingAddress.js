import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  resetAuthResponse,
  updateShippingAddressAction,
} from "../../redux/actions/authAction";

const useUpdateShippingAddress = () => {
  const { resUpdateShippingAddress } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateShippingAddress = (payload) => {
    dispatch(updateShippingAddressAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateShippingAddress?.status_code === 200) {
      NotificationSuccess(t("notification"), resUpdateShippingAddress.message);
      dispatch(resetAuthResponse());
    }
    if (
      resUpdateShippingAddress &&
      resUpdateShippingAddress.status_code !== 200
    ) {
      NotificationError(t("notification"), resUpdateShippingAddress.message);
    }
  }, [resUpdateShippingAddress]);
  return {
    resUpdateShippingAddress,
    updateShippingAddress,
  };
};

export default useUpdateShippingAddress;
