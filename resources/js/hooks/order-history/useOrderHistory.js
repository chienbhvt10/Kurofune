import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryAction } from "../../redux/actions/orderHistoryAction";

const useOrderHistory = () => {
  const orderHistoryState = useSelector((state) => state.orderHistoryState);
  const dispatch = useDispatch();

  const getOrderHistory = () => {
    dispatch(getOrderHistoryAction());
  };

  return {
    orderHistory: orderHistoryState.orderHistory,
    getOrderHistory
  };
};

export default useOrderHistory;
