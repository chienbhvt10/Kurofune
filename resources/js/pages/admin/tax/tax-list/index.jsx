import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage.js";
import useTaxes from "../../../../hooks/tax/useTaxes";
import useDeleteTax from "../../../../hooks/tax/useDeleteTax";
import { useTranslation } from "react-i18next";
import TaxTable from "./TaxTable";
import "./tax.scss";
import PageHead from "../../../../commons/PageHead";

const TaxList = () => {
  const { getTaxes, taxes, pagination, loadingTax } = useTaxes();

  const { deleteTax } = useDeleteTax();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();

  const lang = getCurrentLanguage();
  const { t } = useTranslation();

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onDelete = (row) => () => {
    deleteTax(row.id);
  };

  const onEdit = (row) => () => {
    navigate(`${lang}/admin/tax/update/${row.id}`);
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getTaxes({
      page: current,
      per_page: per_page,
    });
  };

  const onSearch = () => {
    getTaxes({ name: searchValue, page: pagination.current_page });
  };

  React.useEffect(() => {
    if (!searchValue) {
      getTaxes({ name: searchValue, page: pagination.current_page });
    }
  }, [searchValue]);

  return (
    <div className="tax-container">
      <PageHead
        title={t("meta.title_tax_list")}
        content={t("meta.content_tax_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/tax/add`}
        breadcrumb={[{}]}
        title={t("admins.tax.title.tax_title")}
        searchField="name"
        onSearch={onSearch}
        searchPlaceHolder={t("admins.tax.placeholder_seach")}
        onChangeSearch={onChangeSearchValue}
      />
      <TaxTable
        loading={loadingTax}
        items={taxes}
        onDelete={onDelete}
        onEdit={onEdit}
        onTableChange={onTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default TaxList;
