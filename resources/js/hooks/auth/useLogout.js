import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";

const useLogout = () => {
  const dispatch = useDispatch();
  const getLogout = () => {
    dispatch(logout());
  };
  return {
    getLogout
  }
}

export default useLogout;
