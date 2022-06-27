import React from "react";

const useHandleImage = (item) => {
  const [avatar, setAvatar] = React.useState();
  const [errorMessImage, setErrorMessImage] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState();

  const onChangeAvatar = (file) => {
    setAvatar(file);
    setErrorMessImage("");
  };

  React.useEffect(() => {
    setAvatarUrl(item?.category_image || "");
  }, [item]);

  return {
    avatar,
    avatarUrl,
    setAvatarUrl,
    errorMessImage,
    onChangeAvatar,
    setErrorMessImage,
  };
};

export default useHandleImage;
