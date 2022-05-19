import { useDispatch, useSelector } from "react-redux";
import { updateBillingAddressAction } from "../../redux/actions/authAction";

const useUpdateBillingAddress = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const updateBillingAddress = (payload) => {
    dispatch(updateBillingAddressAction(payload));
  };
  return {
    resUpdateBillingAddress: authState.resUpdateBillingAddress,
    updateBillingAddress,
  };
};

export default useUpdateBillingAddress;
