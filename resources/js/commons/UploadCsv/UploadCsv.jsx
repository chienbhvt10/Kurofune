import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Upload } from "antd";
import { useTranslation } from "react-i18next";
import "./upload-csv.scss";
const UploadCsv = ({ onChangeFile }) => {
  const { t } = useTranslation();

  const onChangeFileCsv = (fileInput) => {
    onChangeFile(fileInput.file.originFileObj);
  };

  return (
    <div className="upload-csv">
      <Upload method="GET" onChange={onChangeFileCsv} showUploadList={false}>
        <Button className="btn-import" type="primary">
          <FontAwesomeIcon
            icon={faDownload}
            className="mr-2"
            style={{ color: "white" }}
          />
          <span>{t("btn_import")}</span>
        </Button>
      </Upload>
    </div>
  );
};

export default UploadCsv;
