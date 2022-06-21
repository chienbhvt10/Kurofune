import React from "react";
import PageHead from "../../../../commons/PageHead";
import { FormInfo } from "../../../../components/form-infor";
import { PROFILE_FORM } from "../../../../constants";
import useShowProfile from "../../../../hooks/auth/useShowProfile";
import useUpdateProfile from "../../../../hooks/auth/useUpdateProfile";
import { useTranslation } from "react-i18next";

export const ChangeProfile = () => {
  const { t } = useTranslation();
  const { profile } = useShowProfile();
  const { updateProfile, resUpdateProfile, isLoadingUpdateProfile } = useUpdateProfile();

  const onSave = (values) => {
    updateProfile(values);
  };

  return (
    <>
      <PageHead
        title={t("meta.title_change_profile")}
        content={t("meta.content_change_profile")}
      />

      <FormInfo
        loading={isLoadingUpdateProfile}
        item={profile}
        onSave={onSave}
        typeForm={PROFILE_FORM}
        response={resUpdateProfile}
      />
    </>
  );
};
