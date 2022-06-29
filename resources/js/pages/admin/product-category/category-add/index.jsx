import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_CREATE } from "../../../../constants";
import useCreateAdminCategory from "../../../../hooks/categoryAdmin/useCreateAdminCategory.js";
import CategoryForm from "../category-form/CategoryForm";

const AddCategory = () => {
  const lang = localStorage.getItem("lang");

  const navigate = useNavigate();

  const { createAdminCategory, resCreateCategory, loadingCreateCategory } = useCreateAdminCategory();
  const onCancel = () => {
    navigate(`${lang}/admin/category-list`);
  };
  const onSave = (data) => {
    createAdminCategory(data);
  };

  return (
    <div id="add-category-page">
      <PageHead
        title={t("meta.title_category_create")}
        content={t("meta.content_category_create")}
      />
      <CategoryForm
        loading={loadingCreateCategory}
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
