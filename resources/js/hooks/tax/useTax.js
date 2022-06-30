import { useDispatch, useSelector } from "react-redux";
import { getTaxAction } from "../../redux/actions/taxAction";
import React from "react";
const useTax = () => {
  const { tax } = useSelector((state) => state.taxState);
  const [loadingTax, setLoadingTax] = React.useState(false);
  const dispatch = useDispatch();

  const getTax = (payload) => {
    setLoadingTax(true);
    dispatch(getTaxAction(payload));
  };
  React.useEffect(() => {
    if (tax) {
      setLoadingTax(false);
    }
  }, [tax]);

  return {
    tax,
    getTax,
    setLoadingTax,
    loadingTax
  };
};

export default useTax;
