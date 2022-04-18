import React from "react";
import Helmet from "react-helmet";
import { FormInfor } from "../../../../components/form-infor";
export const ChangeProfile = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change profile</title>
        <meta name="description" content="Change profile Page" />
        <meta name="og:title" content="Change profile" />
      </Helmet>
     <FormInfor/>
     </>
  );
};
