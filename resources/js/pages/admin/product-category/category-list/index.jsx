import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import useAdminCategories from "../../../../hooks/categoryAdmin/useAdminCategories.js";
import useDeleteAdminCategory from "../../../../hooks/categoryAdmin/useDeleteAdminCategory.js";
import "./category.scss";
import CategoryTable from "./CategoryTable";
import { useTranslation } from "react-i18next";

const CategoryList = () => {
  // const lang = localStorage.getItem("lang");
  const { getAdminCategories, adminCategories } = useAdminCategories();
  const { deleteAdminCategory, resDeleteCategory } = useDeleteAdminCategory();
  const navigate = useNavigate();

  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const onDelete = (row) => () => {
    deleteAdminCategory(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/category/update/${row.id}`);
  };

  React.useEffect(() => {
    if (!adminCategories) {
      getAdminCategories();
    }
  }, [adminCategories]);

  React.useEffect(() => {
    if (resDeleteCategory?.error_code === "NO_ERROR") {
      getAdminCategories();
      NotificationSuccess("Thông báo", "Xoá Category Thành Công!");
    }
    return () => {};
  }, [resDeleteCategory]);

  return (
    <div className="category-container">
      <TableHeader
        addLink={`${lang}/admin/category/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Category List", routerLink: "/category-list" },
        ]}
        title="Product Category"
        textSearch={t("admins.category.placeholder_seach")}
      />
      <CategoryTable
        items={adminCategories}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CategoryList;
