import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/actions/userAction";

const useCreateUser = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const updateUser = (payload) => {
    dispatch(updateUserAction(payload));
  };
  return {
    users: userState.users,
    resUpdateUser: userState.resUpdateUser,
    updateUser,
  };
};

export default useCreateUser;
