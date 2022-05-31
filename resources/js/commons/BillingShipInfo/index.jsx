import React from "react";
import { useTranslation } from "react-i18next";

const BillingShipInfo = ({ info, title }) => {
  const { t } = useTranslation();
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan="6" className="header-title">
            {title}
          </td>
        </tr>
        <tr>
          <td className="td-label">
            {t("client.order-detail.field_full_name")}
          </td>
          <td colSpan="3">{info.fullName}</td>
          <td>{t("client.order-detail.field_phone")}</td>
          <td>{info.phone}</td>
        </tr>
        <tr>
          <td className="td-label">{t("client.order-detail.field_postal")}</td>
          <td>{info.postal}</td>
          <td>{t("client.order-detail.field_prefecture")}</td>
          <td>{info.prefecture}</td>
          <td>{t("client.order-detail.field_email")}</td>
          <td>{info.email}</td>
        </tr>
        <tr>
          <td className="td-label">{t("client.order-detail.field_city")}</td>
          <td>{info.city}</td>
          <td>{t("client.order-detail.field_street")}</td>
          <td colSpan="3">{info.street}</td>
        </tr>
        <tr>
          <td className="td-label">{t("client.order-detail.field_house")}</td>
          <td colSpan="5">{info.house}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BillingShipInfo;
