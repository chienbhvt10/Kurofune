import React from "react";
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
          <div className="card card-product-cat">
            {medicineList1.map((item) => (
              <div className="item-product-cat">
                <div className="item-pc-wrap">
                  <a href={item.href}>
                    <div className="item-pc-image">
                      <img src={item.src} alt={item.name} />
                    </div>
                    <div className="item-pc-name">{item.name}</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="type-wrapper">
          <div className="type-name">指定第2類</div>
          <div className="card card-product-cat">
            {medicineList2.map((item) => (
              <div className="item-product-cat">
                <div className="item-pc-wrap">
                  <a href={item.href}>
                    <div className="item-pc-image">
                      <img src={item.src} alt={item.name} />
                    </div>
                    <div className="item-pc-name">{item.name}</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="type-wrapper">
          <div className="type-name">第2類</div>
          <div className="card card-product-cat">
            {medicineList3.map((item) => (
              <div className="item-product-cat">
                <div className="item-pc-wrap">
                  <a href={item.href}>
                    <div className="item-pc-image">
                      <img src={item.src} alt={item.name} />
                    </div>
                    <div className="item-pc-name">{item.name}</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineListPage;
