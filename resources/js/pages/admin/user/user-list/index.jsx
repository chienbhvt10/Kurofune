import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { useDispatch, useSelector } from "react-redux";
import { TableHeader } from "../../../../commons/TableHeader";
import useUsers from "../../../../hooks/user/useUsers";
import { users } from "../../../../redux/actions/userAction";
import "./user-list.scss";
import { UserTable } from "./UserTable";

export const UserList = () => {
  const lang = localStorage.getItem("lang");
  const { getUsers } = useUsers();
  const users = useSelector((state) => state.userState.users);
  function createMarkup() {
    return { __html: t("login.title") };
  }
  React.useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, [users]);

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
      <UserTable items={users} />
    </div>
  );
};
