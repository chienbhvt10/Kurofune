import { EyeOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Upload } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  TYPE_IMAGE_JPEG,
  TYPE_IMAGE_JPG,
  TYPE_IMAGE_PNG,
} from "../../constants";
import "./upload-dragger.scss";

const UploadDragger = ({ imageUrlProps, onChangeImage, setIsRemoveImage }) => {
  const { t } = useTranslation();
  const ref = React.useRef();
  const [previewImage, setPreviewImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();

  const beforeUpload = (file) => {
    const isValidImage =
      file.type === TYPE_IMAGE_PNG ||
      file.type === TYPE_IMAGE_JPEG ||
      file.type === TYPE_IMAGE_JPG;

    if (!isValidImage) {
      message.error("Ảnh phải là định dạng png/jpeg/jpg/gif");
      throw new Error("Ảnh phải là định dạng png/jpeg/jpg/gif");
    }

    const isLessThan5MB = file.size / 1024 / 1024 < 5;
    if (!isLessThan5MB) {
      message.error("Ảnh phải nhỏ hơn 5MB");
      throw new Error("Ảnh phải nhỏ hơn 5MB");
    }

    return false;
  };

  const handleChange = async (info) => {
    onChangeImage && onChangeImage(info.file);
    setImageUrl(URL.createObjectURL(info.file));
  };

  React.useEffect(() => {
    if (imageUrlProps) {
      setImageUrl(imageUrlProps);
    }
  }, [imageUrlProps]);

  const onCancel = () => {
    setPreviewImage(false);
  };

  const openModal = () => {
    setPreviewImage(true);
  };

  const onRemoveImage = () => {
    onChangeImage(undefined);
    setImageUrl("");
    setIsRemoveImage(true);
  };

  const preventSubmit = (e) => e.preventDefault();

  return (
    <div className="form-image-custom">
      <div className="container">
        <Modal
          visible={previewImage}
          title="Preview"
          footer={null}
          onCancel={onCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={imageUrl || "/avatars/default.png"}
          />
        </Modal>
        <input
          onClick={preventSubmit}
          type="image"
          src={imageUrl || "/avatars/default.png"}
          className="image"
          alt="avatar"
          height={300}
          style={{ width: "100%", objectFit: "cover" }}
        />
        {imageUrl && (
          <div className="middle">
            <Space>
              <Button
                type="ghost"
                shape="circle"
                icon={<EyeOutlined style={{ color: "#ffffff" }} />}
                size="middle"
                title="Xem"
                onClick={openModal}
              />
              <Button
                type="ghost"
                shape="circle"
                icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
                size="middle"
                title="Xóa"
                onClick={onRemoveImage}
              />
            </Space>
          </div>
        )}
      </div>
      <Upload
        ref={ref}
        name="image"
        className="upload"
        onChange={handleChange}
        multiple={false}
        beforeUpload={beforeUpload}
        showUploadList={false}
        accept="image/*"
      >
        <Button
          type="primary"
          className="btn-upload"
          icon={<UploadOutlined className="icon-upload" />}
        >
          {t("admins.btn_upload")}
        </Button>
      </Upload>
    </div>
  );
};

export default UploadDragger;
