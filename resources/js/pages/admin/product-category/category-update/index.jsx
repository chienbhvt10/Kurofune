import React from "react";
import { useNavigate } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import CategoryForm from "../category-form/CategoryForm";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/admin/category-list");
  };
  const onSave = () => {};
  const item = {};
  return (
    <div id="update-category-page">
      <CategoryForm
        item={item}
        typeForm={TYPE_FORM_UPDATE}
        title="Update Category"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default UpdateCategory;
