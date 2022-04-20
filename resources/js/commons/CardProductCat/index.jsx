import React from "react";
import { Link } from "react-router-dom";
import "./card-product-cat.scss";
const CardProductCat = ({ cardItems }) => {
  let lang = localStorage.getItem("lang");
  return (
    <div className="card card-product-cat">
      {cardItems.map((item, index) => (
        <div key={index} className="item-product-cat">
          <div className="item-pc-wrap">
            <Link to={`${lang}${item.href}`}>
              <div className="item-pc-image">
                <img src={item.src} alt={item.name} />
              </div>
              <div className="item-pc-name">{item.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProductCat;
