import React from "react";

const useHandleImage = () => {
  const [avatar, setAvatar] = React.useState();
  const onChangeAvatar = (file) => {
    setAvatar(file);
  };

  return {
    avatar,
    onChangeAvatar,
  };
};

export default useHandleImage;
