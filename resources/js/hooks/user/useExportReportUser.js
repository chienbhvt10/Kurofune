import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportReportUserAction } from "../../redux/actions/userAction";

const useExportReportUser = () => {
  const { loadingExport } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const exportCsvReportUser = (payload) => {
    dispatch(exportReportUserAction(payload));
  };

  return {
    exportCsvReportUser,
    loadingExport,
  };
};

export default useExportReportUser;
