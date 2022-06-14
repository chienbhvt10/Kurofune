import React from "react";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useGetListOrderAdmin from "../../../../hooks/orderAdmin/useGetListOrderAdmin";
import "./order.scss";
import OrderTable from "./OrderTable";
const OrderList = () => {
  const lang = getCurrentLanguage();

  const [dataOrder,setDataOrder]= React.useState([])
  let {getListOrderAdmin}=useGetListOrderAdmin()
  React.useEffect(() => {
    getListOrderAdmin((data)=>{
      console.log('data',data);
      setDataOrder(data)
    })
  },[])
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
      <OrderTable items={dataOrder?.data} />
    </div>
  );
};

export default OrderList;
