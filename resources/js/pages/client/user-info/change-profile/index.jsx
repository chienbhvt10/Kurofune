import React from "react";
import Helmet from "react-helmet";
import { FormInfor } from "../../../../components/form-infor";
import useShowProfile from "../../../../hooks/user/useShowProfile";
export const ChangeProfile = () => {
  const { showProfile, profile } = useShowProfile();
  React.useEffect(() => {
    if (!profile) {
      showProfile();
    }
  }, [profile]);

  const onSave = (value) => {};
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change profile</title>
        <meta name="description" content="Change profile Page" />
        <meta name="og:title" content="Change profile" />
      </Helmet>
      <FormInfor item={profile} onSave={onSave} />
    </>
  );
};
