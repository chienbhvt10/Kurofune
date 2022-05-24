import { useDispatch, useSelector } from "react-redux";
import { getPharmacyAction } from "../../redux/actions/pharmacyAction";

const usePharmacies = () => {
  const pharmacyState = useSelector((state) => state.pharmacyState);
  const dispatch = useDispatch();

  const getPharmacy = (payload) => {
    dispatch(getPharmacyAction(payload));
  };

  return {
    pharmacy: pharmacyState.pharmacy,
    getPharmacy,
  };
};

export default usePharmacies;
