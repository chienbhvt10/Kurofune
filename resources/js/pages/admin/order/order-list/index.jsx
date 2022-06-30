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
  let { getListOrderAdmin } = useGetListOrderAdmin();
  const { deleteOrderAdmin } = useDeleteOrderAdmin();
  const prevDataListRef = useRef();
  React.useEffect(() => {
    getListOrderAdmin({ page: 1, per_page: 10 }, (data) => {
      setDataOrder(data);
      prevDataListRef.current = data.data;
    });
  }, []);

  const handleDeleteOrder = (id) => {
    deleteOrderAdmin(id, (data) => {
      getListOrderAdmin(null, (response) => {
        setDataOrder(response);
      });
    });
  };

  const debounceSearch = useCallback(
    debounce((valueSearch) => {
      getListOrderAdmin(
        { page: 1, per_page: 10, status: valueSearch },
        (data) => {
          setDataOrder(data);
        }
      );
    }, 1000),
    []
  );

  return (
    <div className="order-container">
      <PageHead
        title={t("meta.title_order_list")}
        content={t("meta.content_order_list")}
      />
      <TableHeader
        addLink={`${lang}/admin/order-add`}
        breadcrumb={[]}
        title="Orders"
      />
      <OrderTable
        items={dataOrder.data}
        handleDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default OrderList;
