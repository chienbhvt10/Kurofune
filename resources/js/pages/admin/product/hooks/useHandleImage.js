import React from "react";

const useHandleImage = () => {
  const [avatar, setAvatar] = React.useState();
  const [isRemoveImage, setIsRemoveImage] = React.useState(false);

  const onChangeAvatar = (file) => {
    setAvatar(file);
  };

  return {
    avatar,
    onChangeAvatar,
    isRemoveImage,
    setIsRemoveImage,
  };
};

export default useHandleImage;
