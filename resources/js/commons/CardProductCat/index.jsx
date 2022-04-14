import React from "react";
import "./card-product-cat.scss";
const CardProductCat = ({ cardItems }) => {
  return (
    <div className="card card-product-cat">
      {cardItems.map((item) => (
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
  );
};

export default CardProductCat;
