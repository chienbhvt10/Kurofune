import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../../../hooks/user/useUser";
import useUpdateUser from "../../../../hooks/user/useUpdateUser";

import { UserForm } from "../user-form/Phase1UserForm";
import useUsers from "../../../../hooks/user/useUsers";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getUser, user } = useUser();
  const { getAllUsers } = useUsers();
  console.log(user?.avatar);

  const { updateUser, resUpdateUser } = useUpdateUser();
  const lang = localStorage.getItem("lang");

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = async (values) => {
    await updateUser(values);
  };

  React.useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (resUpdateUser?.status_code === 200) {
      getAllUsers();
      navigate(`${lang}/admin/user-list`);
    } else {
      return;
    }
  }, [resUpdateUser]);

  return (
    <div id="update-user">
      {user && (
        <UserForm
          onCancel={onCancel}
          onSave={onSave}
          item={user}
          title="Update User"
          typeForm="update"
          response={resUpdateUser}
        />
      )}
    </div>
  );
};

export default UpdateUser;
