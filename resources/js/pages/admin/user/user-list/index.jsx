import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { TableHeader } from "../../../../commons/TableHeader";
import "./style.scss";
import { UserTable } from "./UserTable";

export const UserList = () => {
  const lang = localStorage.getItem("lang");
  function createMarkup() {
    return { __html: t("login.title") };
  }

  const products = [
    {
      id: 1,
      userName: "User1",
      imageUrl: "https://avatars.githubusercontent.com/u/5580297?s=32&v=4",
      name: "admin",
      email: "admin@example.com",
      role: "admin",
      post: "0",
      products: "",
    },
    {
      id: 2,
      userName: "User2",
      imageUrl:
        "https://pharma.its-globaltek.com/wp-content/uploads/2021/12/6_rinderon-1.jpg",
      name: "user",
      email: "user@example.com",
      role: "user",
      post: "0",
      products: "",
    },
  ];
  return (
    <div className="user-container">
      <TableHeader
        addLink={`${lang}/admin/user-create`}
        title={"User"}
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "User List", routerLink: "/users" },
        ]}
      />
      <UserTable items={products} />
    </div>
  );
};
