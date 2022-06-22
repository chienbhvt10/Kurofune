import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CardCategoryDetail from "../../../commons/CardCategoryDetail";
import "./category-list-detail.scss";
import useCategory from "../../../hooks/category/useCategory";
import PageHead from "../../../commons/PageHead";

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
      <PageHead
        title={t("meta.title_product_of_category")}
        content={t("meta.content_product_of_category")}
      />
      <div id="category-list-detail">
        <div className="list_categories">
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.product_detail.product_list")}
            </div>
          </div>
          <CardCategoryDetail cardItems={category} />
        </div>
      </div>
    </>
  );
};

export default CategoryListDetail;
