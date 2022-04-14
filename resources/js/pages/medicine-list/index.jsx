import React from "react";
import CardProductCat from "../../commons/CardProductCat";
import {
  medicineList1,
  medicineList2,
  medicineList3,
} from "../../commons/data";
import "./medicine-list.scss";
const MedicineListPage = () => {
  return (
    <div id="medicine-list">
      <div className="list_categories">
        <div className="type-wrapper">
          <div className="type-name">第1類</div>
          <CardProductCat cardItems={medicineList1} />
        </div>
        <div className="type-wrapper">
          <div className="type-name">指定第2類</div>
          <CardProductCat cardItems={medicineList2} />
        </div>
        <div className="type-wrapper">
          <div className="type-name">第2類</div>
          <CardProductCat cardItems={medicineList3} />
        </div>
      </div>
    </div>
  );
};

export default MedicineListPage;
