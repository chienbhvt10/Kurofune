import React from "react";
import { Link } from "react-router-dom";
import "./card-category.scss";

const CardCategory = ({ cardItems, type }) => {
  const lang = localStorage.getItem("lang");

  return (
    <div className="card card-product-cat">
      {cardItems?.map((item, index) => (
        <React.Fragment key={index}>
          <div className="item-product-cat">
            {item.type === type && (
              <div className="item-pc-wrap">
                <Link to={`${lang}/category-list-detail/${item.id}`}>
                  <div className="item-pc-image">
                    <img src={item.category_image} alt={item.name} />
                  </div>
                  <div className="item-pc-name">{item.name}</div>
                </Link>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardCategory;
