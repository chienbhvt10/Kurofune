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
  const { getAdminCategories, adminCategories, pagination } =
    useAdminCategories();
  const { deleteAdminCategory, resDeleteCategory, resCreateCategory } =
    useDeleteAdminCategory();
  const navigate = useNavigate();

  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const onDelete = (row) => () => {
    deleteAdminCategory(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/category/update/${row.id}`);
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAdminCategories({ page: current, per_page: per_page });
  };

  const onSearch = (values) => {
    getAdminCategories({ page: pagination.current_page, name: values.name });
  };

  React.useEffect(() => {
    if (!adminCategories) {
      getAdminCategories();
    }
  }, [adminCategories]);

  React.useEffect(() => {
    if (resDeleteCategory?.error_code === "NO_ERROR") {
      getAdminCategories();
      NotificationSuccess(t("notification"), resDeleteCategory.message);
    }
    return () => { };
  }, [resDeleteCategory]);

  React.useEffect(() => {
    getAdminCategories();
  }, [resCreateCategory]);

  return (
    <div className="category-container">
      <TableHeader
        addLink={`${lang}/admin/category/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Category List", routerLink: "/category-list" },
        ]}
        title="Product Category"
        searchField="name"
        onSearch={onSearch}
        searchPlaceHolder={t("admins.category.placeholder_seach")}
      />
      <CategoryTable
        items={adminCategories}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default CategoryList;
