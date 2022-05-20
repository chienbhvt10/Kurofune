import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../redux/actions/authAction";

const useChangePassword = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const changePassword = (payload) => {
    dispatch(changePasswordAction(payload));
  };
  return {
    resChangePassword: authState.resChangePassword,
    changePassword,
  };
};

export default useChangePassword;
