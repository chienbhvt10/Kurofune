import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const useLogout = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const getLogout = () => {
    dispatch(logout());
  };
  return {
    resLogout: authState.resLogout,
    getLogout,
  };
};

export default useLogout;
