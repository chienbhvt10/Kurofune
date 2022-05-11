import React from "react";
import "./category.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import CategoryTable from "./CategoryTable";
import { TableHeader } from "../../../../commons/TableHeader";
const CategoryList = () => {
  const data = [
    {
      id: "1",
      categoryImage: "abc",
      name: "abc",
      slug: "guard1",
      type: "aaa",
    },
    {
      id: "2",
      categoryImage: "xyz",
      name: "sxy",
      slug: "guard2",
      type: "bbb",
    },
  ];
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
      <CategoryTable items={data} />
    </div>
  );
};

export default CategoryList;
