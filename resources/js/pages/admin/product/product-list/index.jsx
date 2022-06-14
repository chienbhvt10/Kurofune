import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useProducts from "../../../../hooks/product/useProducts.js";
import useDeleteProduct from "./../../../../hooks/product/useDeleteProduct";
import "./product.scss";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { getAllProducts, products, pagination, loadingListProduct } =
    useProducts();
  const { deleteProduct, loadingDeleteProduct } = useDeleteProduct();
  const { t } = useTranslation();

  const onDelete = (row) => async () => {
    deleteProduct(row.id);
  };
  const onEdit = (row) => () => {
    navigate(`${lang}/admin/product/update/${row.id}`);
  };
  const onSearch = (values) => {
    getAllProducts({ page: pagination.current_page, name: values.name });
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAllProducts({ page: current, per_page: per_page });
  };

  React.useEffect(() => {
    getAllProducts({ page: pagination.current_page });
  }, []);

  return (
    <div className="product-container">
      <TableHeader
        addLink={`${lang}/admin/product/add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Product List", routerLink: `${lang}/product-list` },
        ]}
        title="Product"
        searchField="name"
        onSearch={onSearch}
        searchPlaceHolder={t("admins.product.placeholder_seach")}
      />
      <ProductTable
        items={products}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
        pagination={pagination}
        loading={loadingListProduct}
        loadingDeleteProduct={loadingDeleteProduct}
      />
    </div>
  );
};

export default ProductList;
