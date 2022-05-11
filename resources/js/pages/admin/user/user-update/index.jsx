import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../../../hooks/user/useUser";
import useUpdateUser from "../../../../hooks/user/useUpdateUser";

import { UserForm } from "../user-form/Phase1UserForm";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, user } = useUser();
  const { updateUser } = useUpdateUser();
  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };
  React.useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);
  const onSave = async (values) => {
    await updateUser(values);
    navigate(`${lang}/admin/user-list`);
  };

  return (
    <div id="update-user">
      <UserForm
        onCancel={onCancel}
        onSave={onSave}
        item={user}
        title="Update User"
        typeForm="update"
      />
    </div>
  );
};

export default UpdateUser;
