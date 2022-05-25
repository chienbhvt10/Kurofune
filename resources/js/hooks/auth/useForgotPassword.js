import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  resetResponseState,
} from "../../redux/actions/authAction";

const useForgotPassword = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const getForgotPassword = (params) => {
    dispatch(forgotPassword(params));
  };
  const resetResponse = () => {
    dispatch(resetResponseState());
  };
  return {
    resForgotPassword: authState.resForgotPassword,
    getForgotPassword,
    resetResponse,
  };
};

export default useForgotPassword;
