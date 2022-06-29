import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importUserAction } from "../../redux/actions/userAction";

const useImportUser = () => {
  const { loadingImport, resImportReportUser } = useSelector(
    (state) => state.userState
  );
  const dispatch = useDispatch();

  const importCsvUser = (payload) => {
    dispatch(importUserAction(payload));
  };

  return {
    importCsvUser,
    loadingImport,
    resImportReportUser,
  };
};

export default useImportUser;
