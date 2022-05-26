import React from "react";
import "./category.scss";
import CategoryTable from "./CategoryTable";
import { TableHeader } from "../../../../commons/TableHeader";
import useCategories from "../../../../hooks/category/useCategories.js";
import useDeleteAdminCategory from "../../../../hooks/categoryAdmin/useDeleteAdminCategory.js";
import { useNavigate } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification";

const CategoryList = () => {
  const lang = localStorage.getItem("lang");
  const { getAllCategories, categories } = useCategories();
  const { deleteAdminCategory, resDeleteCategory } = useDeleteAdminCategory();
  const navigate = useNavigate();

  const onDelete = (row) => () => {
    deleteAdminCategory(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/category/update/${row.id}`);
  };

  React.useEffect(() => {
    getAllCategories();
  }, []);

  React.useEffect(() => {
    if (resDeleteCategory?.status_code === 200) {
      getAllCategories();
      NotificationSuccess("Thông báo", "Xoá Category Thành Công!");
      return;
    }
    return () => {};
  }, [resDeleteCategory]);

  return (
    <div className="category-container">
      <TableHeader
        addLink="/admin/category/add"
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Category List", routerLink: "/category-list" },
        ]}
        title="Product Category"
      />
      <CategoryTable items={categories} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default CategoryList;
