import { message, Modal, Upload } from "antd";
import React from "react";
import { getBase64 } from "../string";
import { PlusOutlined } from "@ant-design/icons";
import "./upload-list.scss";
const UploadList = ({ onChangeFileList, fileListProps }) => {
  const [previewImageURL, setPreviewImageURL] = React.useState();
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [fileList, setFileList] = React.useState();

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

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageURL(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = async (info) => {
    const listBase64 = await Promise.all(
      info.fileList.map(async (file) => {
        return await getBase64(file.originFileObj).then((data) => data);
      })
    );

    onChangeFileList && onChangeFileList(listBase64);
    setFileList(info.fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onCancel = () => {
    setPreviewVisible(false);
  };

  return (
    <div className="list-picture">
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        multiple
        accept="image/*"
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList?.length >= 6 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title="Preview"
        footer={null}
        onCancel={onCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImageURL} />
      </Modal>
    </div>
  );
};

export default UploadList;
