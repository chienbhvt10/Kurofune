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
    response: userState.response,
    updateUser,
  };
};

export default useCreateUser;
