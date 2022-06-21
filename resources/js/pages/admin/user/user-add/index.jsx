import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHead from "../../../../commons/PageHead";
import { TYPE_FORM_CREATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import useCreateUser from "../../../../hooks/user/useCreateUser";
import { UserForm } from "../user-form/Phase1UserForm";

const AddUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createUser, resCreateUser, loadingCreateUser } = useCreateUser();
  const lang = getCurrentLanguage();

  const onCancel = () => {
    navigate(`${lang}/admin/user-list`);
  };

  const onSave = (values) => {
    createUser(values);
  };

  return (
    <div id="add-user">
      <PageHead
        title={t("meta.title_user_create")}
        content={t("meta.content_user_create")}
      />
      <UserForm
        loading={loadingCreateUser}
        response={resCreateUser}
        onCancel={onCancel}
        onSave={onSave}
        title={t("admins.user.create.title")}
        typeForm={TYPE_FORM_CREATE}
      />
    </div>
  );
};

export default AddUser;
