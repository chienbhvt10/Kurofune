import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../redux/actions/userAction";

const useUser = () => {
  const user = useSelector((state) => state.userState.user);
  const [loadingUser, setLoadingUser] = React.useState(false);
  const dispatch = useDispatch();
  const getUser = (payload) => {
    setLoadingUser(true);
    dispatch(getUserAction(payload));
  };
  React.useEffect(() => {
    if (user) {
      setLoadingUser(false);
    }
  }, [user]);
  return {
    user,
    getUser,
    setLoadingUser,
    loadingUser,
  };
};

export default useUser;
