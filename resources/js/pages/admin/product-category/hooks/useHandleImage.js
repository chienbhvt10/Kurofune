import React from "react";

const useHandleImage = () => {
  const [avatar, setAvatar] = React.useState();
  const [errorMessImage, setErrorMessImage] = React.useState("");

  const onChangeAvatar = (file) => {
    setAvatar(file);
    setErrorMessImage("");
  };

  return {
    avatar,
    errorMessImage,
    onChangeAvatar,
    setErrorMessImage,
  };
};

export default useHandleImage;
