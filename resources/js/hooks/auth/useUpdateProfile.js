import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/actions/authAction";

const useUpdateProfile = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const updateProfile = (payload) => {
    dispatch(updateProfileAction(payload));
  };
  return {
    resUpdateProfile: authState.resUpdateProfile,
    updateProfile,
  };
};

export default useUpdateProfile;
