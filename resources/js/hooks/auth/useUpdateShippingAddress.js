import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error";
import {
  resetAuthResponse,
  updateShippingAddressAction,
} from "../../redux/actions/authAction";

const useUpdateShippingAddress = () => {
  const { resUpdateShippingAddress } = useSelector((state) => state.authState);
  const [loadingUpdateShipping, setLoadingUpdateShipping] = React.useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateShippingAddress = (payload) => {
    setLoadingUpdateShipping(true);
    dispatch(updateShippingAddressAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateShippingAddress?.error_code === NO_ERROR) {
      setLoadingUpdateShipping(false);
      NotificationSuccess(
        t("notification"),
        resUpdateShippingAddress.error_message
      );
      dispatch(resetAuthResponse());
    }
    if (
      resUpdateShippingAddress &&
      resUpdateShippingAddress.error_code !== ERROR
    ) {
      setLoadingUpdateShipping(false);
      NotificationError(
        t("notification"),
        resUpdateShippingAddress.error_message
      );
    }
  }, [resUpdateShippingAddress]);
  return {
    resUpdateShippingAddress,
    updateShippingAddress,
    loadingUpdateShipping,
    setLoadingUpdateShipping,
  };
};

export default useUpdateShippingAddress;
