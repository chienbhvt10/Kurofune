import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import {
  resetAuthResponse,
  updateBillingAddressAction,
} from "../../redux/actions/authAction";

const useUpdateBillingAddress = () => {
  const { resUpdateBillingAddress } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateBillingAddress = (payload) => {
    dispatch(updateBillingAddressAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateBillingAddress?.status_code === 200) {
      NotificationSuccess(t("notification"), resUpdateBillingAddress.message);
      dispatch(resetAuthResponse());
    }
    if (
      resUpdateBillingAddress &&
      resUpdateBillingAddress.status_code !== 200
    ) {
      NotificationError(t("notification"), resUpdateBillingAddress.message);
    }
  }, [resUpdateBillingAddress]);

  return {
    resUpdateBillingAddress,
    updateBillingAddress,
  };
};

export default useUpdateBillingAddress;
