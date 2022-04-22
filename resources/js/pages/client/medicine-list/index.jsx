import React from "react";
import { useTranslation } from "react-i18next";
import CardProductCat from "../../../commons/CardProductCat";
import {
  medicineList1,
  medicineList2,
  medicineList3,
} from "../../../commons/data";
import PageHead from "../../../commons/PageHead";
import "./medicine-list.scss";
const MedicineListPage = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <PageHead content="Medicine List" title="Medicine List" />
      <div id="medicine-list">
        <div className="list_categories">
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name1")}
            </div>
            <CardProductCat cardItems={medicineList1} />
          </div>
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name2")}
            </div>
            <CardProductCat cardItems={medicineList2} />
          </div>
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name3")}
            </div>
            <CardProductCat cardItems={medicineList3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineListPage;
