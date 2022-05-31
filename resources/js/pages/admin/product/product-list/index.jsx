import React from "react";
import "./product.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ProductTable from "./ProductTable";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
const ProductList = () => {
  const lang = getCurrentLanguage();
  const data = [
    {
      id: "1",
      name: "guard1",
      price: 1,
      categories: "abc",
      store: "store1",
      date: "13/3",
    },
    {
      id: "2",
      name: "guard2",
      price: 2,
      categories: "xyz",
      store: "store2",
      date: "13/3",
    },
  ];
  return (
    <div className="product-container">
      <TableHeader
        addLink={`${lang}/admin/product/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Product List", routerLink: `${lang}/product-list` },
        ]}
        title="Product"
      />
      <ProductTable items={data} />
    </div>
  );
};

export default ProductList;
