import { useDispatch, useSelector } from "react-redux";
import { getTaxAction } from "../../redux/actions/taxAction";

const useTax = () => {
  const { tax } = useSelector((state) => state.taxState);
  const dispatch = useDispatch();

  const getTax = (payload) => {
    dispatch(getTaxAction(payload));
  };

  return {
    tax,
    getTax,
  };
};

export default useTax;
