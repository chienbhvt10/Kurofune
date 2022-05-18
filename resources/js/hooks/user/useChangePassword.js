import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../redux/actions/userAction";

const useChangePassword = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const changePassword = (payload) => {
    dispatch(changePasswordAction(payload));
  };
  return {
    response: userState.response,
    changePassword,
  };
};

export default useChangePassword;
