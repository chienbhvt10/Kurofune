import React from "react";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../../../../hooks/user/createUser";
import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const { createUser, users } = useCreateUser();
  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };
  const onSave = async (values) => {
    await createUser(values);
    navigate(`${lang}/admin/user-list`);
  };
  return (
    <div id="add-user">
      <UserForm
        onCancel={onCancel}
        onSave={onSave}
        title="Create User"
        typeForm="create"
      />
    </div>
  );
};

export default AddUser;
