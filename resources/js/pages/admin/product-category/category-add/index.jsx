import React from "react";
import { useNavigate } from "react-router-dom";
import useCreateAdminCategory from "../../../../hooks/categoryAdmin/useCreateAdminCategory.js";
import { TYPE_FORM_CREATE } from "../../../../constants";
import CategoryForm from "../category-form/CategoryForm";
import { t } from "i18next";

const AddCategory = () => {
  const lang = localStorage.getItem("lang");

  const navigate = useNavigate();

  const { createAdminCategory, resCreateCategory } = useCreateAdminCategory();
  const onCancel = () => {
    navigate(`${lang}/admin/category-list`);
  };
  const onSave = (data) => {
    createAdminCategory(data);
  };

  return (
    <div id="add-category-page">
      <CategoryForm
        typeForm={TYPE_FORM_CREATE}
        title={t("admins.category.title.product_category_add")}
        onCancel={onCancel}
        onSave={onSave}
        response={resCreateCategory}
      />
    </div>
  );
};

export default AddCategory;
