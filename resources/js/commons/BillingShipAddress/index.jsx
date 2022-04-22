import React from "react";
import { useTranslation } from "react-i18next";

const BillingShipAddress = ({ info, title }) => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <h2>{title}</h2>
      <div className="info-wrap">
        <div className="info-row full-name">
          <p className="label">{t("client.checkout.field_full_name")}</p>
          <p>{info.fullName}</p>
        </div>
        <div className="info-row post-code">
          <p className="label">{t("client.checkout.field_zip_code")}</p>
          <p>{info.postal}</p>
        </div>
        <div className="info-row prefecture">
          <p className="label">{t("client.checkout.field_prefecture")}</p>
          <p>{info.prefecture}</p>
        </div>
        <div className="info-row city">
          <p className="label">{t("client.checkout.field_town_city")}</p>
          <p>{info.city}</p>
        </div>
        <div className="info-row address1">
          <p className="label">{t("client.checkout.field_street")}</p>
          <p>{info.street}</p>
        </div>
        <div className="info-row address2">
          <p className="label">{t("client.checkout.field_house")}</p>
          <p>{info.house}</p>
        </div>
        <div className="info-row phone">
          <p className="label">{t("client.checkout.field_phone")}</p>
          <p>{info.phone}</p>
        </div>
        <div className="info-row email">
          <p className="label">{t("client.checkout.field_email")}</p>
          <p>{info.email}</p>
        </div>
      </div>
    </>
  );
};

export default BillingShipAddress;
