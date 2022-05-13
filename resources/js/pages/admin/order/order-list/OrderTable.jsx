import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next/lib/src/bootstrap-table";
import { Link } from "react-router-dom";

const OrderTable = ({ items }) => {
  const columns = [
    {
      dataField: "orderNumber",
      text: "Order",
      formatter: (cell, row) => (
        <Link
          to={`/order-update/:${row.id}`}
          style={{ textDecoration: "none" }}
        >
          <span>{row.orderNumber}</span>
        </Link>
      ),
    },
    { dataField: "subOrders", text: "SubOrders" },
    { dataField: "date", text: "Date" },
    { dataField: "status", text: "Status" },
    { dataField: "total", text: "Total" },
    {
      dataField: "action",
      text: "",
      style: {
        textAlign: "center",
      },
      headerStyle: {
        width: 80,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              border: "1px solid ",
              padding: 7,
              borderRadius: 3,
              width: 8,
            }}
          />
        </Link>
      ),
    },
  ];
  const defaultSorted = [{ dataField: "name", order: "desc" }];
  return (
    <BootstrapTable
      keyField="id"
      columns={columns}
      data={items}
      defaultSorted={defaultSorted}
      //   selectRow={{ mode: "checkbox" }}
      bootstrap4
      bordered
      hover
      striped
      tabIndexCell
    />
  );
};

export default OrderTable;
