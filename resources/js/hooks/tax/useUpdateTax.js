import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { updateTaxAction } from "../../redux/actions/taxAction";
import { useTranslation } from "react-i18next";
import { NO_ERROR, ERROR } from "../../constants/error";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import useTaxes from "./useTaxes";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";

const useUpdateTax = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();

  const { resUpdateTax, loadingUpdateTax } = useSelector((state) => state.taxState);
  const { getTaxes, pagination } = useTaxes();
  const dispatch = useDispatch();

  const updateTax = (data) => {
    return dispatch(updateTaxAction(data));
  };

  React.useEffect(() => {
    if (resUpdateTax?.error_code === NO_ERROR) {
      navigate(`${lang}/admin/tax-list`);
      NotificationSuccess(t("notification"), resUpdateTax?.message);
    }
  }, [resUpdateTax]);

  return {
    updateTax,
    resUpdateTax,
    loadingUpdateTax
  };
};

export default useUpdateTax;
