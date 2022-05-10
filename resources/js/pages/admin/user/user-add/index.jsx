import React from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };
  return (
    <div id="add-user">
      <UserForm onCancel={onCancel} />
    </div>
  );
};

export default AddUser;
