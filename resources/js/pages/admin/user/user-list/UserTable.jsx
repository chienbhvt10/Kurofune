import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import "./style.scss";

export const UserTable = ({ items }) => {
  const columns = [
    {
      dataField: "userName",
      text: "Username",
      sort: true,

      formatter: (cellContent, row) => {
        return (
          <Link to="/" className="text-decoration-none d-flex">
            <img
              src={row.imageUrl}
              alt=""
              style={{ width: "25px", height: "25px", marginRight: 10 }}
            />
            <span>{row.userName}</span>
          </Link>
        );
      },
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      headerStyle: {
        width: 100,
      },
    },
    {
      dataField: "post",
      text: "Post",
      headerStyle: {
        width: 70,
      },
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "product",
      text: "Product",
      headerStyle: {
        width: 100,
      },
    },
    {
      dataField: "jp",
      text: "",
      align: "center",
      headerAlign: "center",
      headerStyle: {
        width: 50,
      },
      formatter: (cell, row) => (
        <Link to="/">
          <img
            className="img-row"
            src="/images/editing.png"
            alt=""
            width={25}
          />
        </Link>
      ),
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={items}
      columns={columns}
      defaultSorted={defaultSorted}
      tabIndexCell
      selectRow={{ mode: "checkbox" }}
      hover
      striped
      noDataIndication={"no results found"}
    />
  );
};
