import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetResponseState } from "../../redux/actions/authAction";

const useForgotPassword = () => {
  const response = useSelector((state) => state.authState.response);
  const dispatch = useDispatch();
  const getForgotPassword = (params) => {
    dispatch(forgotPassword(params));
  };
  const resetResponse = () => {
    dispatch(resetResponseState());
  }
  return {
    response,
    getForgotPassword,
    resetResponse
  };
};

export default useForgotPassword;
