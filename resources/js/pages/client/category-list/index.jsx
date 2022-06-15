import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardCategory from "../../../commons/CardCategory";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";
import useCategories from "../../../hooks/category/useCategories";
import "./category-list.scss";
import { uniqBy } from "lodash";

const CategoryListPage = () => {
  const { i18n, t } = useTranslation();
  const { getAllCategories, categories } = useCategories();
  const lang = getCurrentLanguage();
  const [typeCategories, setTypeCategories] = React.useState();
  React.useEffect(() => {
    if (!categories) {
      getAllCategories();
    }
    const typeCategory = uniqBy(categories?.map((category) => category.type));
    setTypeCategories(typeCategory);
  }, [categories]);

  React.useEffect(() => {
    getAllCategories();
  }, [lang]);

  return (
    <>
      <PageHead content="Category List" title="Category List" />
      <div id="category-list">
        <div className="list_categories">
          {typeCategories?.map((typeCategory, index) => (
            <div className="type-wrapper" key={index}>
              <div className="type-name"> {t(`client.medicine_list.type_name${typeCategory}`)}</div>
              <CardCategory cardItems={categories} type={typeCategory} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryListPage;
