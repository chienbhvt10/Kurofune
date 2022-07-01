import { useDispatch, useSelector } from "react-redux";
import {
  getPharmaciesAction,
  getPharmaciesAdminAction,
  getProductPharmacyAction,
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
  const getDetailProductPharmacy = (payload) => {
    dispatch(getProductPharmacyAction(payload))
  }
  return {
    pharmacies: pharmacyState.pharmacies,
    pharmaciesAdmin: pharmacyState.pharmaciesAdmin,
    productPharmacy: pharmacyState.productPharmacy,
    getAllPharmacies,
    getAllPharmaciesAdmin,
    getDetailProductPharmacy
  };
};

export default usePharmacies;
