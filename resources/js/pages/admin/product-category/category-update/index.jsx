import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TYPE_FORM_UPDATE } from "../../../../constants";
import CategoryForm from "../category-form/CategoryForm";
import useAdminCategory from "./../../../../hooks/categoryAdmin/useAdminCategory";
import useUpdateAdminCategory from "./../../../../hooks/categoryAdmin/useUpdateAdminCategory";

const UpdateCategory = () => {
  const lang = localStorage.getItem("lang");
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAdminCategory, adminCategory } = useAdminCategory();
  const { updateAdminCategory, resUpdateCategory } = useUpdateAdminCategory();

  const onCancel = () => {
    navigate(`${lang}/admin/category-list`);
  };
  const onSave = (data) => {
    updateAdminCategory(data);
  };

  React.useEffect(() => {
    if (id) {
      getAdminCategory(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (resUpdateCategory?.status_code === 200) {
      navigate(`${lang}/admin/user-list`);
    } else return;
  }, [resUpdateCategory]);

  return (
    <div id="update-category-page">
      <CategoryForm
        item={adminCategory}
        typeForm={TYPE_FORM_UPDATE}
        title="Update Category"
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  );
};

export default UpdateCategory;
