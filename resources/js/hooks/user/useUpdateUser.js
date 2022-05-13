import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/actions/userAction";

const useCreateUser = () => {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const updateUser = (payload) => {
    dispatch(updateUserAction(payload));
  };
  return {
    users,
    updateUser,
  };
};

export default useCreateUser;
