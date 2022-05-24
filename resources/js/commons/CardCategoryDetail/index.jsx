import React from "react";
import { Link } from "react-router-dom";
import "./card-category-detail.scss";
const CardCategoryDetail = ({ cardItems }) => {
  let lang = localStorage.getItem("lang");
  return (
    <div className="card card-category-detail">
      {cardItems?.map((item, index) => (
        <div key={index} className="item-category-detail">
          <div className="item-pc-wrap">
            <Link to={`${lang}/product-detail/${item.id}`}>
              <div className="item-pc-image">
                <img src={item.product_image} alt={item.name} />
              </div>
              <div className="item-pc-name">{item.name}</div>
              <div className="item-pc-price">{item.price} [JPY]</div>
              <div className="item-pc-vendor">Vendor: {item.vendor}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCategoryDetail;
