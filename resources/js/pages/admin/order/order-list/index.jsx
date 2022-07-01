import { debounce } from "lodash";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import PageHead from "../../../../commons/PageHead";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteOrderAdmin from "../../../../hooks/orderAdmin/useDeleteOrderAdmin";
import useGetListOrderAdmin from "../../../../hooks/orderAdmin/useGetListOrderAdmin";
import "./order.scss";
import OrderTable from "./OrderTable";

const OrderList = () => {
  const lang = getCurrentLanguage();
  const { t } = useTranslation();
  const [dataOrder, setDataOrder] = React.useState([]);
  let { getListOrderAdmin, pagination} = useGetListOrderAdmin();
  const { deleteOrderAdmin } = useDeleteOrderAdmin();
  const prevDataListRef = useRef();
  React.useEffect(() => {
    getListOrderAdmin(null,(data) => {
      setDataOrder(data);
      prevDataListRef.current = data;
    });
  }, []);
  const handleDeleteOrder = (id) => {
    deleteOrderAdmin(id, (data) => {
      getListOrderAdmin(null, (response) => {
        setDataOrder(response);
      });
    });
  };

  const onTableChange = (paginationTable, filters, sorter) => {
    const current = paginationTable.current || 1;
    const per_page = paginationTable.pageSize || 10;
    getListOrderAdmin({ page: current, per_page: per_page },(data)=>{
      setDataOrder(data);
    });
  };
  return (
    <div className="order-container">
      <PageHead
        title={t("meta.title_order_list")}
        content={t("meta.content_order_list")}
      />
      <TableHeader
        // addLink={`${lang}/admin/order-add`}
        breadcrumb={[]}
        title="Orders"
      />
      <OrderTable
        items={dataOrder.data}
        handleDeleteOrder={handleDeleteOrder}
        pagination={pagination}
        onTableChange={onTableChange}
        onChange={onTableChange}
      />
    </div>
  );
};

export default OrderList;
