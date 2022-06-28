import React from "react";

const useHandleImage = () => {
  const [avatar, setAvatar] = React.useState();
  const [images_inside, setImagesInSide] = React.useState();
  const [images_outside, setImagesOutSide] = React.useState();
  const [images_delete, setImagesDelete] = React.useState([]);
  const [isRemoveAvatar, setIsRemoveAvatar] = React.useState(false);

  const onChangeAvatar = (file) => {
    setAvatar(file);
  };

  const onChangeImageOutside = (fileList) => {
    setImagesOutSide(fileList);
  };

  const onChangeImageInside = (fileList) => {
    setImagesInSide(fileList);
  };

  const onSaveImgInsideDelete = (index) => {
    setImagesDelete([...images_delete, index]);
  };

  const onSaveImgOutsideDelete = (index) => {
    setImagesDelete([...images_delete, index]);
  };

  return {
    avatar,
    images_inside,
    images_outside,
    images_delete,
    onChangeAvatar,
    onChangeImageOutside,
    onChangeImageInside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    isRemoveAvatar,
    setIsRemoveAvatar,
  };
};

export default useHandleImage;
