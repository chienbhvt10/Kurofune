import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetResponseState,
} from "../../redux/actions/authAction";

const useResetPassword = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const getResetPassword = (params) => {
    dispatch(resetPassword(params));
  };
  const resetResponse = () => {
    dispatch(resetResponseState());
  };
  return {
    resResetPassword: authState.resResetPassword,
    getResetPassword,
    resetResponse,
  };
};

export default useResetPassword;
