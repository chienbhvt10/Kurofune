import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/actions/userAction";

const useUsers = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const getAllUsers = (payload) => {
    dispatch(getUsersAction(payload));
  };

  return {
    users: userState.users,
    pagination: {
      total: userState.total,
      from: userState.from,
      to: userState.to,
      current_page: userState.current_page,
      last_page: userState.last_page,
    },
    getAllUsers,
  };
};

export default useUsers;
