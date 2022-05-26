import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_ADD } from "../../../../constants";
import useCreateAdminCategory from "../../../../hooks/categoryAdmin/useCreateAdminCategory.js";
import CategoryForm from "../category-form/CategoryForm";

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

  React.useEffect(() => {
    if (resCreateCategory?.status_code === 200) {
      navigate(`${lang}/admin/category-list`);
    } else return;
  }, [resCreateCategory]);
  return (
    <div id="add-category-page">
      <CategoryForm
        typeForm={TYPE_FORM_ADD}
        title="Add Category"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default AddCategory;
