import { DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Space, Upload } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { getBase64 } from "../string";
import "./upload-list.scss";
const UploadList = (props) => {
  const { onChangeFileList, fileListUrlProps, onSaveDeletedImage } = props;
  const { t } = useTranslation();
  const [previewImageURL, setPreviewImageURL] = React.useState();
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [fileList, setFileList] = React.useState();
  const [fileListUrl, setFileListUrl] = React.useState();

  const beforeUpload = (file) => {
    const isValidImage =
      file.type === TYPE_IMAGE_PNG ||
      file.type === TYPE_IMAGE_JPEG ||
      file.type === TYPE_IMAGE_JPG;
    if (!isValidImage) {
      message.error("Ảnh phải là định dạng png/jpeg/jpg/gif");
      throw new Error("Ảnh phải là định dạng png/jpeg/jpg/gif");
    }
    return true;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageURL(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = async (info) => {
    const filesObj = info.fileList.map((file) => file.originFileObj);
    onChangeFileList && onChangeFileList(filesObj);
    setFileList(info.fileList);
  };

  const onCancel = () => {
    setPreviewVisible(false);
  };

  React.useEffect(() => {
    const newArr = fileList?.map((file) => {
      return { file, url: URL.createObjectURL(file.originFileObj) };
    });
    if (!fileListUrlProps) {
      setFileListUrl(newArr);
    } else {
      setFileListUrl(
        newArr ? fileListUrlProps?.concat(newArr) : fileListUrlProps
      );
    }
  }, [fileList, fileListUrlProps]);

  const openModal = (url) => () => {
    setPreviewVisible(true);
    setPreviewImageURL(url);
  };

  const onRemoveImage = (deletedImage, deletedImageIndex) => () => {
    const newFileListURL = fileListUrl.filter(
      (item) => item.url !== deletedImage.url
    );
    setFileListUrl(newFileListURL);
    if (deletedImage.url.startsWith("https")) {
      onSaveDeletedImage(deletedImageIndex);
    }
  };

  return (
    <Row justify="center" className="upload-list">
      <Col span={24}>
        <Row justify="center">
          <Upload
            listType="picture"
            className="upload"
            fileList={fileList}
            showUploadList={false}
            beforeUpload={beforeUpload}
            multiple
            accept="image/*"
            onChange={handleChange}
            onPreview={handlePreview}
          >
            <Button
              type="primary"
              className="btn-upload"
              icon={<UploadOutlined className="icon-upload" />}
            >
              {t("admins.btn_upload")}
            </Button>
          </Upload>
          <Modal
            visible={previewVisible}
            title="Preview"
            footer={null}
            onCancel={onCancel}
          >
            <img
              alt="example"
              className="modal-image"
              style={{ width: "100%" }}
              src={previewImageURL}
            />
          </Modal>
        </Row>
      </Col>
      <Col span={24} className="list-picture">
        <Row justify="center">
          {fileListUrl?.map((item, index) => (
            <Col key={index} className="image-container">
              <Col className="list-image-preview">
                <img src={item.url} alt="Image outside" />
                <div className="middle">
                  <Space>
                    <Button
                      type="ghost"
                      shape="circle"
                      icon={<EyeOutlined style={{ color: "#ffffff" }} />}
                      size="small"
                      title="Xem"
                      onClick={openModal(item.url)}
                    />
                    <Button
                      type="ghost"
                      shape="circle"
                      icon={<DeleteOutlined style={{ color: "#ffffff" }} />}
                      size="small"
                      title="Xóa"
                      onClick={onRemoveImage(item, index)}
                    />
                  </Space>
                </div>
              </Col>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default UploadList;
