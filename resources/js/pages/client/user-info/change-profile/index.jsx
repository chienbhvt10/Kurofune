import React from "react";
import Helmet from "react-helmet";
import { FormInfor } from "../../../../components/form-infor";
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
      <FormInfor
        item={profile}
        onSave={onSave}
        typeForm="profile"
        response={resUpdateProfile}
      />
    </>
  );
};
