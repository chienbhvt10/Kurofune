import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCreateUser from "../../../../hooks/user/createUser";
import useUsers from "../../../../hooks/user/useUsers";

import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const { createUser, resCreateUsers } = useCreateUser();
  const { getAllUsers } = useUsers();
  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = async (values) => {
    await createUser(values);
  };
  React.useEffect(() => {
    if (resCreateUsers?.status_code === 200) {
      getAllUsers();
      navigate(`${lang}/admin/user-list`);
    } else {
      return;
    }
  }, [resCreateUsers]);
  return (
    <div id="add-user">
      <UserForm
        response={resCreateUsers}
        onCancel={onCancel}
        onSave={onSave}
        title="Create User"
        typeForm="create"
      />
    </div>
  );
};

export default AddUser;
