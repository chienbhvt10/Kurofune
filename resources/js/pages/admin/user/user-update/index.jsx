import React from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../user-form/Phase1UserForm";

const UpdateUser = () => {
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };
  return (
    <div id="update-user">
      <UserForm onCancel={onCancel} />
    </div>
  );
};

export default UpdateUser;
