import React from "react";
import Helmet from "react-helmet";
import { FormInfo } from "../../../../components/form-infor";
import { PROFILE_FORM } from "../../../../constants";
import useShowProfile from "../../../../hooks/auth/useShowProfile";
import useUpdateProfile from "../../../../hooks/auth/useUpdateProfile";

export const ChangeProfile = () => {
  const { profile } = useShowProfile();
  const { updateProfile, resUpdateProfile, loadingUpdateProfile } =
    useUpdateProfile();

  const onSave = (values) => {
    updateProfile(values);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change profile</title>
        <meta name="description" content="Change profile Page" />
        <meta name="og:title" content="Change profile" />
      </Helmet>
      <FormInfo
        loading={loadingUpdateProfile}
        item={profile}
        onSave={onSave}
        typeForm={PROFILE_FORM}
        response={resUpdateProfile}
      />
    </>
  );
};
