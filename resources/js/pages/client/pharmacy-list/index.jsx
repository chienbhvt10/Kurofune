import React from "react";
import { useTranslation } from "react-i18next";
import CardPharmacy from "../../../commons/CardPharmacy";
import usePharmacies from "../../../hooks/pharmacy/usePharmacies";
import "./pharmacy-list.scss";
const PharmacyList = () => {
  const { i18n, t } = useTranslation();
  const { getAllPharmacies, pharmacies } = usePharmacies();

  React.useEffect(() => {
    if (!pharmacies) {
      getAllPharmacies();
    }
  }, [pharmacies]);
  return (
    <>
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
