import React from "react";
import { useTranslation } from "react-i18next";
import CardPharmacy from "../../../commons/CardPharmacy";
import usePharmacies from "../../../hooks/pharmacy/usePharmacies";
import "./pharmacy-list.scss";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";

const PharmacyList = () => {
  const {   t } = useTranslation();
  const { getAllPharmacies, pharmacies } = usePharmacies();
  const lang = getCurrentLanguage();
  React.useEffect(() => {
      getAllPharmacies();
  }, [lang]);
  return (
    <>
      <PageHead
        title={t("meta.title_pharmacy_list")}
        content={t("meta.content_pharmacy_list")}
      />
      <div id="pharmacy-list">
        <div className="list_pharmacies">
          <div className="type-wrapper">
            <div className="type-name">List of Pharmacies</div>
          </div>
          <CardPharmacy cardItems={pharmacies} />
        </div>
      </div>
    </>
  );
};

export default PharmacyList;
