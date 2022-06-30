import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  addTaxAction,
  resetTaxCRUDAction,
} from "../../redux/actions/taxAction";
import { NO_ERROR, ERROR } from "../../constants/error";
import {
  NotificationSuccess,
  NotificationError,
} from "../../commons/Notification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCurrentLanguage } from "../../helper/localStorage.js";
import useTaxes from "./useTaxes.js";

const useCreateTax = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = getCurrentLanguage();
  const dispatch = useDispatch();

  const { resAddTax, taxes } = useSelector((state) => state.taxState);
  const [loadingCreateTax, setLoadingCreateTax] = React.useState(false);
  const { getTaxes, pagination } = useTaxes();

  const createTax = (data) => {
    setLoadingCreateTax(true);
    dispatch(addTaxAction(data));
  };

  React.useEffect(() => {
    if (resAddTax?.error_code === NO_ERROR) {
      NotificationSuccess(t("notification"), resAddTax?.message);
      navigate(`${lang}/admin/tax-list`);
    }
  }, [resAddTax]);
  React.useEffect(() => {
    if (taxes) {
      setLoadingCreateTax(false);
    }
  }, [taxes]);
  return {
    createTax,
    resAddTax,
    taxes,
    setLoadingCreateTax,
    loadingCreateTax
  };
};

export default useCreateTax;
