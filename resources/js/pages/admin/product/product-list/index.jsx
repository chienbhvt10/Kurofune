import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification";
import { TableHeader } from "../../../../commons/TableHeader";
import useProducts from "../../../../hooks/product/useProducts.js";
import useDeleteProduct from "./../../../../hooks/product/useDeleteProduct";
import "./product.scss";
import ProductTable from "./ProductTable";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { getAllProducts, products, pagination } = useProducts();
  const { deleteProduct, resDeleteProduct } = useDeleteProduct();
  const { t } = useTranslation();

  const onDelete = (row) => async () => {
    deleteProduct(row.id);
  };
  const onEdit = (row) => () => {
    navigate(`${lang}/admin/product/update/${row.id}`);
  };

  React.useEffect(() => {
    getAllProducts();
  }, []);

  React.useEffect(() => {
    if (resDeleteProduct?.status_code === 200) {
      getAllProducts({ page: 1 });
      NotificationSuccess(
        t("admins.product.notification"),
        resDeleteProduct.message
      );
    } else {
      return;
    }
  }, [resDeleteProduct]);

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAllProducts({ page: current, per_page: per_page });
  };

  return (
    <div className="product-container">
      <TableHeader
        addLink={`${lang}/admin/product/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Product List", routerLink: `${lang}/product-list` },
        ]}
        title="Product"
        textSearch={t("admins.product.placeholder_seach")}
      />
      <ProductTable
        items={products}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default ProductList;
