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
  updateBillingAddressAction,
} from "../../redux/actions/authAction";

const useUpdateBillingAddress = () => {
  const { resUpdateBillingAddress } = useSelector((state) => state.authState);
  const [loadingUpdateBilling, setLoadingUpdateBillings] = React.useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateBillingAddress = (payload) => {
    setLoadingUpdateBillings(true);
    dispatch(updateBillingAddressAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateBillingAddress?.error_code === NO_ERROR) {
      setLoadingUpdateBillings(false);
      NotificationSuccess(t("notification"), resUpdateBillingAddress.message);
      dispatch(resetAuthResponse());
    }
    if (
      resUpdateBillingAddress &&
      resUpdateBillingAddress.error_code === ERROR
    ) {
      setLoadingUpdateBillings(false);
      NotificationError(
        t("notification"),
        resUpdateBillingAddress.error_message
      );
    }
  }, [resUpdateBillingAddress]);

  return {
    resUpdateBillingAddress,
    updateBillingAddress,
    loadingUpdateBilling,
    setLoadingUpdateBillings,
  };
};

export default useUpdateBillingAddress;
