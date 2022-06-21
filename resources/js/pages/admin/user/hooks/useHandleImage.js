import React from "react";

const useHandleImage = () => {
  const [avatar, setAvatar] = React.useState();
  const [images_inside, setImagesInSide] = React.useState();
  const [images_outside, setImagesOutSide] = React.useState();
  const [images_inside_delete, setImagesInSideDelete] = React.useState([]);
  const [images_outside_delete, setImagesOutSideDelete] = React.useState([]);

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
    setImagesInSideDelete([...images_inside_delete, index]);
  };

  const onSaveImgOutsideDelete = (index) => {
    setImagesOutSideDelete([...images_outside_delete, index]);
  };

  return {
    avatar,
    images_inside,
    images_outside,
    images_inside_delete,
    images_outside_delete,
    onChangeAvatar,
    onChangeImageOutside,
    onChangeImageInside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
  };
};

export default useHandleImage;
