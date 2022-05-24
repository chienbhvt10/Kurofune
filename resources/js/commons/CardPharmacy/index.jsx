import React from "react";
import { Link } from "react-router-dom";
import "./card-pharmacy.scss";

const CardCategory = ({ cardItems }) => {
  const lang = localStorage.getItem("lang");

  return (
    <div className="card card-pharmacy">
      {cardItems?.map((item, index) => (
        <div key={index} className="item-pharmacy">
          <div className="item-pc-wrap">
            <Link to={`${lang}/pharmacy-detail/${item.id}`}>
              <div className="item-pc-image">
                <img src={item.images_outside[0]} alt={item.name} />
              </div>
              <div className="item-pc-name">{item.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCategory;
