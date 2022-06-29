import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaxAction,
  resetTaxCRUDAction,
} from "../../redux/actions/taxAction";
import { useTranslation } from "react-i18next";
import { NO_ERROR, ERROR } from "../../constants/error";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import useTaxes from "./useTaxes";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useDeleteAdminCategory = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();

  const { resDeleteTax } = useSelector((state) => state.taxState);

  const { getTaxes, pagination } = useTaxes();
  const dispatch = useDispatch();

  const deleteTax = (id) => {
    dispatch(deleteTaxAction(id));
  };

  React.useEffect(() => {
    if (resDeleteTax?.error_code === NO_ERROR) {
      getTaxes({ page: pagination.current_page });
      NotificationSuccess(t("notification"), resDeleteTax?.message);
    }
  }, [resDeleteTax]);

  return {
    deleteTax,
    resDeleteTax,
  };
};

export default useDeleteAdminCategory;
