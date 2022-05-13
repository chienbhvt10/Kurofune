import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../redux/actions/userAction";

const useUser = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const getUser = (payload) => {
    dispatch(getUserAction(payload));
  };
  return {
    user,
    getUser,
  };
};

export default useUser;
