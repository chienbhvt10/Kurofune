import React from "react";
import "./product.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ProductTable from "./ProductTable";
const ProductList = () => {
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
    <div className="permission-container">
      <div className="table-header">
        <div className="table-title">Product table</div>
        <div className="tool">
          <button>
            <img className="icon" src="/images/add-button.png" alt="" />
            <p>Product</p>
          </button>
        </div>
      </div>
      <ProductTable items={data} />
    </div>
  );
};

export default ProductList;
