import React from "react";

const useHandleImage = (item) => {
  const [avatar, setAvatar] = React.useState();
  const [avatarUrl, setAvatarUrl] = React.useState();
  const [isRemoveImage, setIsRemoveImage] = React.useState(false);
  const onChangeAvatar = (file) => {
    setAvatar(file);
  };

  React.useEffect(() => {
    setAvatarUrl(item?.category_image || "");
  }, [item]);

  return {
    avatar,
    avatarUrl,
    isRemoveImage,
    setAvatarUrl,
    onChangeAvatar,
    setIsRemoveImage,
  };
};

export default useHandleImage;
