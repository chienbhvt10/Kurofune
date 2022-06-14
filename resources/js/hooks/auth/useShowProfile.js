import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../redux/actions/authAction";

const useShowProfile = () => {
  const { profile } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const showProfile = (payload) => {
    dispatch(showProfileAction(payload));
  };

  React.useEffect(() => {
    if (!profile) {
      showProfile();
    }
  }, [profile]);
  return {
    profile,
    showProfile,
  };
};

export default useShowProfile;
