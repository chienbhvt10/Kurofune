import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../../redux/actions/userAction";

const useDeleteUser = () => {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const deleteUser = (payload) => {
    dispatch(deleteUserAction(payload));
  };
  return {
    users,
    deleteUser,
  };
};

export default useDeleteUser;
