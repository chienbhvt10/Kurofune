import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification/index.jsx";
import { TYPE_FORM_ADD } from "../../../../constants";
import useCreateAdminCategory from "../../../../hooks/categoryAdmin/useCreateAdminCategory.js";
import { TYPE_FORM_CREATE } from "../../../../constants";
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
      NotificationSuccess('Thông báo', 'Thêm category mới thành công')
      navigate(`${lang}/admin/category-list`);
    } else {
      return;
    }
  }, [resCreateCategory]);
  return (
    <div id="add-category-page">
      <CategoryForm
        typeForm={TYPE_FORM_CREATE}
        title="Add Category"
        onCancel={onCancel}
        onSave={onSave}
        response={resCreateCategory}
      />
    </div>
  );
};

export default AddCategory;
