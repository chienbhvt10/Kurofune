import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersAction,
  resetResCRUDAction,
} from "../../redux/actions/userAction";

const useUsers = () => {
  const { users, total, from, to, current_page, last_page, per_page } =
    useSelector((state) => state.userState);
  const [loadingListUser, setLoadingListUser] = React.useState(false);
  const dispatch = useDispatch();

  const getAllUsers = (payload) => {
    setLoadingListUser(true);
    dispatch(getUsersAction(payload));
    dispatch(resetResCRUDAction());
  };

  React.useEffect(() => {
    if (users) {
      setLoadingListUser(false);
    }
  }, [users]);

  return {
    users,
    pagination: {
      total,
      from,
      to,
      current_page,
      last_page,
      per_page,
    },
    getAllUsers,
    loadingListUser,
    setLoadingListUser,
  };
};

export default useUsers;
