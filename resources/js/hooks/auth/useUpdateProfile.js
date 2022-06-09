import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
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
    if (resUpdateProfile?.status_code === 200) {
      setLoadingUpdateProfile(false);
      NotificationSuccess(t("notification"), resUpdateProfile.message);
      dispatch(resetAuthResponse());
    }
    if (resUpdateProfile && resUpdateProfile.status_code !== 200) {
      setLoadingUpdateProfile(false);
      NotificationError(t("notification"), resUpdateProfile.message);
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
