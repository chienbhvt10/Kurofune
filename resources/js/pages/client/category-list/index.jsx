import React from "react";
import { useTranslation } from "react-i18next";
import CardCategory from "../../../commons/CardCategory";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";
import useCategories from "../../../hooks/category/useCategories";
import "./category-list.scss";
const CategoryListPage = () => {
  const { i18n, t } = useTranslation();
  const { getAllCategories, categories } = useCategories();
  const lang = getCurrentLanguage();
  React.useEffect(() => {
    if (!categories) {
      getAllCategories();
    }
  }, [categories]);

  React.useEffect(() => {
    getAllCategories();
  }, [lang]);

  return (
    <>
      <PageHead content="Category List" title="Category List" />
      <div id="category-list">
        <div className="list_categories">
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name1")}
            </div>
            <CardCategory cardItems={categories} type={1} />
          </div>
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name2")}
            </div>
            <CardCategory cardItems={categories} type={2} />
          </div>
          <div className="type-wrapper">
            <div className="type-name">
              {t("client.medicine_list.type_name3")}
            </div>
            <CardCategory cardItems={categories} type={3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryListPage;
