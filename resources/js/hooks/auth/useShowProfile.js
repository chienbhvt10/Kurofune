import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../redux/actions/authAction";

const useShowProfile = () => {
  const profile = useSelector((state) => state.authState.profile);
  const dispatch = useDispatch();
  const showProfile = (payload) => {
    dispatch(showProfileAction(payload));
  };
  return {
    profile,
    showProfile,
  };
};

export default useShowProfile;
