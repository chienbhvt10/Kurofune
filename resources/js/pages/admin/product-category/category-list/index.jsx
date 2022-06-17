import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import useAdminCategories from "../../../../hooks/categoryAdmin/useAdminCategories.js";
import useDeleteAdminCategory from "../../../../hooks/categoryAdmin/useDeleteAdminCategory.js";
import "./category.scss";
import CategoryTable from "./CategoryTable";

const CategoryList = () => {
  const { getAdminCategories, adminCategories, pagination } =
    useAdminCategories();
  const { deleteAdminCategory, resDeleteCategory, resCreateCategory } =
    useDeleteAdminCategory();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();

  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onDelete = (row) => () => {
    deleteAdminCategory(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/category/update/${row.id}`);
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAdminCategories({
      page: current,
      per_page: per_page,
    });
  };

  const onSearch = () => {
    getAdminCategories({ name: searchValue });
  };

  React.useEffect(() => {
    if (!searchValue) {
      getAdminCategories();
    }
  }, [searchValue]);

  return (
    <div className="category-container">
      <PageHead
        title={t("meta.title_category_list")}
        content={t("meta.content_category_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/category/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          {
            name: t("admins.category.title.category_list"),
            routerLink: "/category-list",
          },
        ]}
        title={t("admins.category.title.product_category_title")}
        searchField="name"
        onSearch={onSearch}
        searchPlaceHolder={t("admins.category.placeholder_seach")}
        onChangeSearch={onChangeSearchValue}
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
