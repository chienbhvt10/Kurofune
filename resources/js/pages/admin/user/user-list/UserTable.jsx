import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";

export const UserTable = ({ items }) => {
  const lang = localStorage.getItem("lang");
  const columns = [
    {
      dataField: "username",
      text: "Username",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <Link
            to={`${lang}/admin/user-update/${row.id}`}
            className="text-decoration-none d-flex"
          >
            <img
              src={row.imageUrl}
              alt=""
              style={{ width: "25px", height: "25px", marginRight: 10 }}
            />
            <span>{row.username}</span>
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
        width: 200,
      },
      formatter: (cellContent, row) => {
        return <span>{row.roles[0].name}</span>;
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
        <Link to={`${lang}/admin/user-update/${row.id}`}>
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
