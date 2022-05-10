import { useDispatch } from "react-redux";
import { roles } from "../../redux/actions/roleAction";

const useRoles = () => {
  const dispatch = useDispatch();
  const getRoles = () => {
    dispatch(roles());
  };
  return {
    getRoles,
  };
};

export default useRoles;
