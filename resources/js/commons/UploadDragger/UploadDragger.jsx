import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Upload } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  TYPE_IMAGE_JPEG,
  TYPE_IMAGE_JPG,
  TYPE_IMAGE_PNG,
} from "../../constants";
import { getBase64 } from "../string";
import "./upload-dragger.scss";

const UploadDragger = ({ imageUrlProps, onChangeImage, loading }) => {
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
    return false;
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

  const onCancel = () => {
    setPreviewImage(false);
  };

  const openModal = () => {
    setPreviewImage(true);
  };

  return (
    <div className="form-image-custom">
      <div className="container">
        <Modal
          visible={previewImage}
          title="Preview"
          footer={null}
          onCancel={onCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={imageUrl} />
        </Modal>
        <input
          type="image"
          src={imageUrl || "/avatars/default.png"}
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
              onClick={openModal}
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
