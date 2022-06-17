import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryAction, getOrderHistoryDetailAction } from "../../redux/actions/orderHistoryAction";

const useOrderHistory = () => {
  const orderHistoryState = useSelector((state) => state.orderHistoryState);
  const dispatch = useDispatch();

  const getOrderHistory = () => {
    dispatch(getOrderHistoryAction());
  };
  const getOrderDetail = (payload) => {
    dispatch(getOrderHistoryDetailAction(payload));
  };

  return {
    orderHistory: orderHistoryState.orderHistory,
    orderHistoryDetail: orderHistoryState.orderHistoryDetail,
    getOrderHistory,
    getOrderDetail
  };
};

export default useOrderHistory;
