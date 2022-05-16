import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetResponseState } from "../../redux/actions/authAction";

const useResetPassword = () => {
  const response = useSelector((state) => state.authState.response);
  const dispatch = useDispatch();
  const getResetPassword = (params) => {
    dispatch(resetPassword(params));
  };
  const resetResponse = (params) => {
    dispatch(resetResponseState(params));
  }
  return {
    response,
    getResetPassword,
    resetResponse
  };
};

export default useResetPassword;
