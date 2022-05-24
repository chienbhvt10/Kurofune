import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CardCategoryDetail from "../../../commons/CardCategoryDetail";
import "./category-list-detail.scss";
import useCategory from "../../../hooks/category/useCategory";

const CategoryListDetail = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const { getCategory, category } = useCategory();

  React.useEffect(() => {
    if (id) {
      getCategory(id);
    }
  }, [id]);
  return (
    <>
      <div id="category-list-detail">
        <div className="list_categories">
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name1")}
            </div>
          </div>
          <CardCategoryDetail cardItems={category} />
        </div>
      </div>
    </>
  );
};

export default CategoryListDetail;
