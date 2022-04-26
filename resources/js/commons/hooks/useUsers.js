import React, { useState } from "react";
import { userApis } from "../../services/user-api";

const useUsers = () => {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const users = await userApis.users().then((data) => data);
    setUsers(users);
  };
  React.useEffect(() => {
    getUsers();
  }, []);
  return {
    users,
    getUsers,
  };
};

export default useUsers;
