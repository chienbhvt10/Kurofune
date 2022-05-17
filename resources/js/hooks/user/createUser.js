import { useDispatch, useSelector } from "react-redux";
import { createUserAction } from "../../redux/actions/userAction";

const useCreateUser = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const createUser = (payload) => {
    dispatch(createUserAction(payload));
  };
  return {
    users: userState.users,
    response: userState.response,
    createUser,
  };
};

export default useCreateUser;
