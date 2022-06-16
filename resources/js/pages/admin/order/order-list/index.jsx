import React from "react";
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
  React.useEffect(() => {
    getListOrderAdmin({ page: 1, per_page: 10 }, (data) => {
      setDataOrder(data)
    })
  }, [])
  const handleDeleteOrder = (id) =>{
    deleteOrderAdmin(id,(data)=>{
      getListOrderAdmin(null,(response) => {
        setDataOrder(response)
      })
    })
  }

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
