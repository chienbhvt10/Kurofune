import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAction } from "../../redux/actions/userAction";

const useCreateUser = () => {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const createUser = (payload) => {
    dispatch(createUserAction(payload));
  };
  return {
    users,
    createUser,
  };
};

export default useCreateUser;
