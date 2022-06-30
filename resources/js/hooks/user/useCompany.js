import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyAction } from "../../redux/actions/userAction";

const useCompany = () => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.userState);

  const getAllCompany = (payload) => {
    dispatch(getCompanyAction(payload));
  };

  React.useEffect(() => {
    getAllCompany();
  }, []);

  return { getAllCompany, company };
};

export default useCompany;
