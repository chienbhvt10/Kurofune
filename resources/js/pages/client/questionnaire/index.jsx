import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./style.scss";
export const Questionnaire = () => {
  const { i18n, t } = useTranslation();
  const [number, setNumber] = useState(5);
  return (
    <div className="questionnaire-container">
      <div className="card">
        <div className="search-wrap">
          <div className="input-group">
            <FontAwesomeIcon
              icon={faSearch}
              size="sm"
              className="icon-search"
            />
            <input type="text" placeholder= {t("questionnaire.placeholder")}  />
          </div>
          <button className="btn-search"> {t("questionnaire.btn_search")} </button>
        </div>
        <div className="product-container">
          <p className="show-number-result">
            {t("questionnaire.title_number_results")} {number}
            {t("questionnaire.description_number")}
          </p>
          <div className="product-list">
            <div className="product-item">
              <Link to={`/products/1`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`/products/1`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`/products/`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
            <div className="product-item">
              <Link to={`/products/1`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`/products/1`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`/products/`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
            <div className="product-item">
              <Link to={`/products/1`} className="product-link">
                <img src="https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg" />
              </Link>
              <div className="product-info">
                <Link to={`/products/1`} className="product-title">
                  リンデロンVs軟膏 10g
                </Link>
                <Link to={`/products/`} className="btn-detail">
                  詳細
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
