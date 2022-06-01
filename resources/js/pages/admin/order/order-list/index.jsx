import React from "react";
import { TableHeader } from "../../../../commons/TableHeader";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import "./order.scss";
import OrderTable from "./OrderTable";
const OrderList = () => {
  const lang = getCurrentLanguage();
  const data = [
    {
      orderNumber: "1",
      subOrders: "guard1",
      date: "13/3",
      status: "abc",
      total: "store1",
    },
    {
      orderNumber: "2",
      subOrders: "guard2",
      date: "13/3",
      status: "abc",
      total: "store1",
    },
  ];
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
      <OrderTable items={data} />
    </div>
  );
};

export default OrderList;
