import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CardCategoryDetail from "../../../commons/CardCategoryDetail";
import "./category-list-detail.scss";
import useCategory from "../../../hooks/category/useCategory";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";

const CategoryListDetail = () => {
  const { i18n, t } = useTranslation();
  const lang = getCurrentLanguage();
  const { id } = useParams();
  const { getCategory, category } = useCategory();
  console.log(
    "🚀 ~ file: index.jsx ~ line 15 ~ CategoryListDetail ~ category",
    category
  );

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
              {
                category?.data?.category?.translations?.find((item) => {
                  const _lang = lang || "ja";
                  return _lang.includes(item.locale);
                })?.name
              }
            </div>
          </div>
          <CardCategoryDetail cardItems={category?.data?.products} />
        </div>
      </div>
    </>
  );
};

export default CategoryListDetail;
