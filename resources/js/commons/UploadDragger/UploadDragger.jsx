import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Upload } from "antd";
import React, { useRef, useState } from "react";
import "./upload-dragger.scss";

const UploadDragger = ({ imageUrlProps, onChangeImage, loading }) => {
  const ref = useRef();
  const [previewImage, setPreviewImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("/avatars/default.png");

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (info) => {
    const base64Image = await getBase64(info.file);
    onChangeImage && onChangeImage(base64Image);
    setImageUrl(URL.createObjectURL(info.file));
  };

  React.useEffect(() => {
    if (imageUrlProps) {
      setImageUrl(imageUrlProps);
    }
  }, [imageUrlProps]);
  return (
    <div className="form-image-custom">
      <div className="container">
        <Modal
          visible={previewImage}
          title="Preview"
          footer={null}
          onCancel={() => setPreviewImage(false)}
        >
          <img alt="example" style={{ width: "100%" }} src={imageUrl} />
        </Modal>
        <input
          type="image"
          src={imageUrl}
          className="image"
          alt="avatar"
          height={300}
          style={{ width: "100%", objectFit: "cover" }}
        />
        <div className="middle">
          <Space>
            <Button
              type="ghost"
              shape="circle"
              icon={<EyeOutlined style={{ color: "#ffffff" }} />}
              size="middle"
              title="Xem"
              onClick={() => setPreviewImage(true)}
            />
          </Space>
        </div>
      </div>
      <Upload
        ref={ref}
        name="image"
        className="upload"
        onChange={handleChange}
        multiple={false}
        beforeUpload={() => false}
        showUploadList={false}
        accept="image/*"
      >
        <Button style={{ marginTop: 10 }} icon={<Upload />}>
          Click to Upload
        </Button>
      </Upload>
    </div>
  );
};

export default UploadDragger;
