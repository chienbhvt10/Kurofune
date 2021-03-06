import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaxesAction,
  resetTaxCRUDAction,
} from "../../redux/actions/taxAction";

const useTaxes = () => {
  const { taxes, from, total, to, current_page, last_page } = useSelector(
    (state) => state.taxState
  );
  const [loadingTax, setLoadingTax] = React.useState(false)
  const dispatch = useDispatch();

  const getTaxes = (value) => {
    setLoadingTax(true)
    dispatch(getTaxesAction(value));
    dispatch(resetTaxCRUDAction());
  };

  React.useEffect(() => {
    if (taxes) {
      setLoadingTax(false);
    }
  }, [taxes]);

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
    loadingTax,
    setLoadingTax
  };
};

export default useTaxes;
