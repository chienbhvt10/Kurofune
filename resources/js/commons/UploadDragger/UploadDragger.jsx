import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import "./upload-dragger.scss";

const UploadDragger = ({ fileProp, onChangeImage, loading }) => {
  const ref = useRef();
  const [file, setFile] = useState();
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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.file);
      console.log(getBase64(file.file));
    }
    setImageUrl(file.url || file.preview);
    setPreviewImage(true);
  };

  const handleChange = async (info) => {
    onChangeImage && onChangeImage(info.file);
    setImageUrl(URL.createObjectURL(info.file));
  };

  const onUpload = () => {
    console.log(ref.current);
    if (ref && ref.current) {
      ref.current.upload();
    }
  };

  React.useEffect(() => {
    if (typeof fileProp === "string" && fileProp.length) {
      setImageUrl(fileProp);
    }
  }, [fileProp]);

  console.log(fileProp);
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
        {typeof fileProp === "string" && (
          <div className="middle" onClick={onUpload}>
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
        )}
      </div>
      <Upload
        ref={ref}
        name="image"
        className="upload"
        onPreview={handlePreview}
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
