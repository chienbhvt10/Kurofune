import { useDispatch, useSelector } from "react-redux";
import { getPharmacyAction, searchPharmacyAction } from "../../redux/actions/pharmacyAction";

const usePharmacies = () => {
  const pharmacyState = useSelector((state) => state.pharmacyState);
  const dispatch = useDispatch();

  const getPharmacy = (payload) => {
    dispatch(getPharmacyAction(payload));
  };
  const searchPharmacies = (payload) => {
    dispatch(searchPharmacyAction(payload));
  };
  return {
    pharmacy: pharmacyState.pharmacy,
    searchPharmacy: pharmacyState.searchPharmacy,
    emptyPharmacy: pharmacyState.emptyPharmacy,
    getPharmacy,
    searchPharmacies,
  };
};

export default usePharmacies;
