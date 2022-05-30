import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const UploadBase64Image = ({ setBase64Image, thumbUrl, item }) => {
  const fileList = [
    {
      status: "done",
      name: `${item?.name}` || "Please upload your Image",
      url: item?.product_image,
      thumbUrl: item?.product_image,
    },
  ];
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleChangeImg = async (data) => {
    setBase64Image(await getBase64(data));
  };

  return (
    <>
      <Upload
        listType="picture"
        maxCount={1}
        defaultFileList={[...fileList]}
        beforeUpload={() => {
          return false;
        }}
        onChange={(file) => {
          if (file) {
            handleChangeImg(file.file);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};

export default UploadBase64Image;
