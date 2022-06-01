import React from "react";
import Helmet from "react-helmet";
import { FormInfo } from "../../../../components/form-infor";
import { PROFILE_FORM } from "../../../../constants";
import useShowProfile from "../../../../hooks/auth/useShowProfile";
import useUpdateProfile from "../../../../hooks/auth/useUpdateProfile";

export const ChangeProfile = () => {
  const { showProfile, profile } = useShowProfile();
  const { updateProfile, resUpdateProfile } = useUpdateProfile();

  React.useEffect(() => {
    if (!profile) {
      showProfile();
    }
  }, [profile]);

  const onSave = async (values) => {
    await updateProfile(values);
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
        item={profile}
        onSave={onSave}
        typeForm={PROFILE_FORM}
        response={resUpdateProfile}
      />
    </>
  );
};
