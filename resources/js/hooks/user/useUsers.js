import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/actions/userAction";

const useUsers = () => {
  const { users, total, from, to, current_page, last_page } = useSelector(
    (state) => state.userState
  );
  const [loadingListUser, setLoadingListUser] = React.useState(false);
  const dispatch = useDispatch();

  const getAllUsers = (payload) => {
    setLoadingListUser(true);
    dispatch(getUsersAction(payload));
  };

  React.useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  }, [users]);

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
    },
    getAllUsers,
    loadingListUser,
    setLoadingListUser,
  };
};

export default useUsers;
