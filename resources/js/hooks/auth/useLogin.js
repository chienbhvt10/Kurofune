import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/authAction";

const useLogin = () => {
  const dispatch = useDispatch();
  const loginUser = (values) => {
    dispatch(login(values));
  };
  return {
    loginUser,
  };
};

export default useLogin;
