import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_CREATE } from "../../../../constants";
import CategoryForm from "../category-form/CategoryForm";

const AddCategory = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/admin/category-list");
  };
  return (
    <div id="add-category-page">
      <CategoryForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Category"
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddCategory;
