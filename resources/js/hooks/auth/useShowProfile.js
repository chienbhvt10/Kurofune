import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../redux/actions/authAction";

const useShowProfile = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const showProfile = (payload) => {
    dispatch(showProfileAction(payload));
  };
  return {
    profile: authState.profile,
    showProfile,
  };
};

export default useShowProfile;
