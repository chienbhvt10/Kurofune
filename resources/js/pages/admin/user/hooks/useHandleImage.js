import React from "react";

const useHandleImage = () => {
  const [base64Avatar, setBase64Avatar] = React.useState();
  const [listBase64ImageInSide, setListBase64ImageInSide] = React.useState();
  const [listBase64ImageOutSide, setListBase64ImageOutSide] = React.useState();

  const onChangeAvatar = (base64Image) => {
    setBase64Avatar(base64Image);
  };

  const onChangeImageOutside = (listBase64Image) => {
    setListBase64ImageOutSide(listBase64Image);
  };

  const onChangeImageInside = (listBase64Image) => {
    setListBase64ImageInSide(listBase64Image);
  };
  return {
    base64Avatar,
    listBase64ImageInSide,
    listBase64ImageOutSide,
    onChangeAvatar,
    onChangeImageOutside,
    onChangeImageInside,
  };
};

export default useHandleImage;
