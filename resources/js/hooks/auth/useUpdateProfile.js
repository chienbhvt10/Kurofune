import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
import { ERROR, NO_ERROR } from "../../constants/error";
import {
  updateProfileAction,
  resetAuthResponse,
} from "../../redux/actions/authAction";
const useUpdateProfile = () => {
  const { resUpdateProfile } = useSelector((state) => state.authState);
  const [loadingUpdateProfile, setLoadingUpdateProfile] = React.useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateProfile = (payload) => {
    setLoadingUpdateProfile(true);
    dispatch(updateProfileAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateProfile?.error_code === NO_ERROR) {
      setLoadingUpdateProfile(false);
      NotificationSuccess(t("notification"), resUpdateProfile.message);
      dispatch(resetAuthResponse());
    }
    if (resUpdateProfile && resUpdateProfile.error_code === ERROR) {
      setLoadingUpdateProfile(false);
      NotificationError(t("notification"), resUpdateProfile.error_message);
    }
  }, [resUpdateProfile]);
  return {
    resUpdateProfile,
    updateProfile,
    loadingUpdateProfile,
    loadingUpdateProfile,
  };
};

export default useUpdateProfile;
