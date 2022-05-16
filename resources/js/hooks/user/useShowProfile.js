import { useDispatch, useSelector } from "react-redux";
import { showProfileAction } from "../../redux/actions/userAction";

const useShowProfile = () => {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const showProfile = (payload) => {
    dispatch(showProfileAction(payload));
  };
  return {
    profile: userState.profile,
    showProfile,
  };
};

export default useShowProfile;
