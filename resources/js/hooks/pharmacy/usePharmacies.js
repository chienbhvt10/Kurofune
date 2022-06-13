import { useDispatch, useSelector } from "react-redux";
import {
  getPharmaciesAction,
  getPharmaciesAdminAction,
} from "../../redux/actions/pharmacyAction";

const usePharmacies = () => {
  const pharmacyState = useSelector((state) => state.pharmacyState);
  const dispatch = useDispatch();

  const getAllPharmacies = () => {
    dispatch(getPharmaciesAction());
  };
  const getAllPharmaciesAdmin = () => {
    dispatch(getPharmaciesAdminAction());
  };

  return {
    pharmacies: pharmacyState.pharmacies,
    pharmaciesAdmin: pharmacyState.pharmaciesAdmin,
    getAllPharmacies,
    getAllPharmaciesAdmin,
  };
};

export default usePharmacies;
