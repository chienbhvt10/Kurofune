import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../redux/actions/roleAction";

const useRoles = () => {
  const roles = useSelector((state) => state.roleState.roles);
  const dispatch = useDispatch();
  const getAllRoles = () => {
    dispatch(getRoles());
  };
  return {
    roles,
    getAllRoles,
  };
};

export default useRoles;
