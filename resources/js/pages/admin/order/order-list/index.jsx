import { debounce } from "lodash";
import React, { useCallback, useRef } from "react";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useDeleteOrderAdmin from "../../../../hooks/orderAdmin/useDeleteOrderAdmin";
import useGetListOrderAdmin from "../../../../hooks/orderAdmin/useGetListOrderAdmin";
import "./order.scss";
import OrderTable from "./OrderTable";
const OrderList = () => {
  const lang = getCurrentLanguage();

  const [dataOrder, setDataOrder] = React.useState([])
  let { getListOrderAdmin } = useGetListOrderAdmin()
  const { deleteOrderAdmin } = useDeleteOrderAdmin()
  const prevDataListRef = useRef();
  React.useEffect(() => {
    getListOrderAdmin({ page: 1, per_page: 10}, (data) => {
      setDataOrder(data)
      prevDataListRef.current= data.data
    })
  }, [])

  const handleDeleteOrder = (id) =>() =>{
    deleteOrderAdmin(id,(data)=>{
      getListOrderAdmin(null,(response) => {
        setDataOrder(response)
      })
    })
  }

  const debounceSearch = useCallback(debounce((valueSearch) => {
    getListOrderAdmin({ page: 1, per_page: 10,status:valueSearch}, (data) => {
      setDataOrder(data)
    })
  }, 1000), [])


  return (
    <div className="order-container">
      <TableHeader
        addLink={`${lang}/admin/order-add`}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Order List", routerLink: "" },
        ]}
        title="Orders"
      />
      <OrderTable items={dataOrder?.data} handleDeleteOrder={handleDeleteOrder} />
    </div>
  );
};

export default OrderList;
