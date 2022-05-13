import React from "react";
import Helmet from "react-helmet";
import { FormInfor } from "../../../../components/form-infor";
export const ChangeProfile = () => {
  const [item, setItem] = React.useState({
    fullName: "",
    toPostalCode: "",
    fromPostalCode: "",
    prefecture: "",
    city: "",
    street: "",
    building: "",
    phone: "",
    email: "",
  });
  const submitChangeProfile = (value) => {};
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change profile</title>
        <meta name="description" content="Change profile Page" />
        <meta name="og:title" content="Change profile" />
      </Helmet>
      <FormInfor item={item} onSubmit={submitChangeProfile} />
    </>
  );
};
