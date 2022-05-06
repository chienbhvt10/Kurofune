import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useDispatch, useSelector } from "react-redux";
import { TableHeader } from "../../../../commons/TableHeader";
import { getUsers } from "../../../../redux/actions/userAction";
import "./user-list.scss";
import { UserTable } from "./UserTable";

export const UserList = () => {
  const lang = localStorage.getItem("lang");
  const users = useSelector((state) => state.userState);
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    dispatch(getUsers("Oke"));
  }, []);
  console.log("dispatch", users);

  return (
    <div className="user-list">
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
