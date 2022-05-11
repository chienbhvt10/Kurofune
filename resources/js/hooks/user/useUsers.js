import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/actions/userAction";

const useUsers = () => {
  const { users } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const getAllUsers = () => {
    dispatch(getUsersAction());
  };

  return {
    users,
    getAllUsers,
  };
};

export default useUsers;
