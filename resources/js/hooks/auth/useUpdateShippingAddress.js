import { useDispatch, useSelector } from "react-redux";
import { updateShippingAddressAction } from "../../redux/actions/authAction";

const useUpdateShippingAddress = () => {
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const updateShippingAddress = (payload) => {
    dispatch(updateShippingAddressAction(payload));
  };
  return {
    resUpdateShippingAddress: authState.resUpdateShippingAddress,
    updateShippingAddress,
  };
};

export default useUpdateShippingAddress;
