import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
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
  const { t } = useTranslation();

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

  return (
    <div id="update-category-page">
      <PageHead
        title={t("meta.title_category_update")}
        content={t("meta.content_category_update")}
      />
      <CategoryForm
        item={adminCategory}
        typeForm={TYPE_FORM_UPDATE}
        title="Update Category"
        onCancel={onCancel}
        onSave={onSave}
        response={resUpdateCategory}
      />
    </div>
  );
};

export default UpdateCategory;
