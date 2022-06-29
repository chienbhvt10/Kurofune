import { useDispatch, useSelector } from "react-redux";
import {
  getTaxesAction,
  resetTaxCRUDAction,
} from "../../redux/actions/taxAction";

const useTaxes = () => {
  const { taxes, from, total, to, current_page, last_page } = useSelector(
    (state) => state.taxState
  );
  const dispatch = useDispatch();

  const getTaxes = (value) => {
    dispatch(getTaxesAction(value));
    dispatch(resetTaxCRUDAction());
  };

  return {
    taxes,
    getTaxes,
    pagination: {
      from,
      to,
      total,
      current_page,
      last_page,
    },
  };
};

export default useTaxes;
