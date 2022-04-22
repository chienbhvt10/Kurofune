import React from "react";
import "./style.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

export const UserList = () => {
  function createMarkup() {
    return { __html: t("login.title") };
  }
  const columns = [
    {
      dataField: "id",
      text: "Use ID",
      sort: true,
    },
    {
      dataField: "userName",
      text: "Username",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <a href="">
             <img
            src={row.imageUrl}
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
          {row.userName}
          </a>

        );
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "post",
      text: "Post",
      sort: true,
    },
    {
      dataField: "products",
      text: "Products",
      sort: true,
    },
  ];
  const products = [
    {
      id: 1,
      userName: "Products",
      imageUrl:
      "https://avatars.githubusercontent.com/u/5580297?s=32&v=4",
      name: "admin",
      email: "admin@example.com",
      role: "admin",
      post: "admins",
      products: "",
    },
    {
      id: 2,
      userName: "Products 1",
      imageUrl:
      "https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg",
      name: "user",
      email: "user@example.com",
      role: "user",
      post: "users",
      products: "",
    },
  ];
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  return (
    <div div className="user-container">
      <div>UserList</div>

      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        tabIndexCell
        selectRow={{ mode: "checkbox" }}
        hover
        striped
        noDataIndication={"no results found"}
      />
    </div>
  );
};
