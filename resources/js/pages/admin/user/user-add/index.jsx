import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCreateUser from "../../../../hooks/user/createUser";
import useUsers from "../../../../hooks/user/useUsers";

import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const { createUser, response } = useCreateUser();
  const { getAllUsers } = useUsers();
  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = async (values) => {
    await createUser(values);
  };
  React.useEffect(() => {
    if (response?.status_code === 200) {
      getAllUsers();
      navigate(`${lang}/admin/user-list`);
    } else {
      return;
    }
  }, [response]);
  return (
    <div id="add-user">
      <UserForm
        response={response}
        onCancel={onCancel}
        onSave={onSave}
        title="Create User"
        typeForm="create"
      />
    </div>
  );
};

export default AddUser;
