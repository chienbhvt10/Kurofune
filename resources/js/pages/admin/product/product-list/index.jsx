import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NotificationSuccess } from "../../../../commons/Notification";
import PageHead from "../../../../commons/PageHead";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useProducts from "../../../../hooks/product/useProducts.js";
import useDeleteProduct from "./../../../../hooks/product/useDeleteProduct";
import "./product.scss";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { getAllProducts, products, pagination } = useProducts();
  const { deleteProduct, resDeleteProduct } = useDeleteProduct();
  const { t } = useTranslation();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onDelete = (row) => async () => {
    deleteProduct(row.id);
  };
  const onEdit = (row) => () => {
    navigate(`${lang}/admin/product/update/${row.id}`);
  };
  const onSearch = (values) => {
    getAllProducts({ name: values.name });
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getAllProducts({ page: current, per_page: per_page });
  };

  React.useEffect(() => {
    getAllProducts();
  }, [lang]);

  React.useEffect(() => {
    if (resDeleteProduct?.error_code === "NO_ERROR") {
      getAllProducts({ page: 1 });
      NotificationSuccess(t("notification"), resDeleteProduct.message);
    } else {
      return;
    }
  }, [resDeleteProduct]);

  return (
    <div className="product-container">
      <PageHead
        title={t("meta.title_product_list")}
        content={t("meta.content_product_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/product/add`}
        breadcrumb={[
          {
            name: t("admins.product.product_list"),
            routerLink: `${lang}/product-list`,
          },
        ]}
        title="Product"
        searchField="name"
        onSearch={onSearch}
        onChangeSearch={onChangeSearchValue}
        searchPlaceHolder={t("admins.product.placeholder_seach")}
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
