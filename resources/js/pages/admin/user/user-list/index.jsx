import React, { useEffect } from "react";
import "./style.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Header } from "../../../../components/Header-list";

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
      imageUrl: "https://avatars.githubusercontent.com/u/5580297?s=32&v=4",
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
      dataField: "id",
      order: "asc",
    },
  ];

  return (
    <div className="user-container">
      <Header
        title={"User"}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "User List", routerLink: "/users" },
        ]}
      />
      <div className="user-tab my-3 d-flex">
        <Link
          className="btn btn-outline-secondary mr-3"
          role="button"
          to="../user-create"
        >
          <FontAwesomeIcon className="mr-1" icon={faPlus} />
          Add new
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              All(12)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link(2)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Acc(10)
            </a>
          </li>
        </ul>
        <div className="user-search ml-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search username"
              aria-label="Search username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              Search
            </button>
          </div>
        </div>
      </div>

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
