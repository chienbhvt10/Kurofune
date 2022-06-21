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
  updateProfileAction,
} from "../../redux/actions/authAction";
import useShowProfile from "./useShowProfile";
const useUpdateProfile = () => {
  const { resUpdateProfile,isLoadingUpdateProfile } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
const {showProfile }= useShowProfile()
  const updateProfile = (payload) => {
    dispatch(updateProfileAction(payload));
  };

  React.useEffect(() => {
    if (resUpdateProfile?.error_code === NO_ERROR) {
      NotificationSuccess(t("notification"), resUpdateProfile.message);
      showProfile(),
      dispatch(resetAuthResponse())
    }
    if (resUpdateProfile && resUpdateProfile.error_code === ERROR) {
      NotificationError(t("notification"), resUpdateProfile.error_message);
    }
  }, [resUpdateProfile]);
  return {
    resUpdateProfile,
    updateProfile,
    isLoadingUpdateProfile
  };
};

export default useUpdateProfile;
