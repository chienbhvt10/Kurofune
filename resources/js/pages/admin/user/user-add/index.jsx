import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../../../../hooks/user/createUser";
import useUsers from "../../../../hooks/user/useUsers";
import { resetResCRUDAction } from "../../../../redux/actions/userAction";
import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const navigate = useNavigate();
  const { createUser, resCreateUser } = useCreateUser();
  const { getAllUsers, pagination } = useUsers();
  const lang = localStorage.getItem("lang");
  const dispatch = useDispatch();
  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = async (values) => {
    await createUser(values);
    await getAllUsers({ page: pagination.current_page });
  };

  React.useEffect(() => {
    if (resCreateUser?.status_code === 200) {
      navigate(`${lang}/admin/user-list`);
      dispatch(resetResCRUDAction());
    } else {
      return;
    }
  }, [resCreateUser]);

  console.log(resCreateUser);
  return (
    <div id="add-user">
      <UserForm
        response={resCreateUser}
        onCancel={onCancel}
        onSave={onSave}
        title="Create User"
        typeForm="create"
      />
    </div>
  );
};

export default AddUser;
