import React from "react";
import { useDispatch } from "react-redux";
import { users } from "../../redux/actions/userAction";

const useUsers = () => {
  const dispatch = useDispatch();
  const getUsers = () => {
    dispatch(users());
  };
  return {
    getUsers,
  };
};

export default useUsers;
