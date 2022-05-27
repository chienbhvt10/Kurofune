import { useDispatch, useSelector } from "react-redux";
import { getPharmaciesAction } from "../../redux/actions/pharmacyAction";

const usePharmacies = () => {
  const pharmacyState = useSelector((state) => state.pharmacyState);
  const dispatch = useDispatch();

  const getAllPharmacies = () => {
    dispatch(getPharmaciesAction());
  };

  return {
    pharmacies: pharmacyState.pharmacies,
    getAllPharmacies,
  };
};

export default usePharmacies;
