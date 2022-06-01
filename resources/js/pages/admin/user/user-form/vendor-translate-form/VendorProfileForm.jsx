import React, { useState } from "react";
import TranslateVendorForm from "./TranslateVendorForm";
import { Row, Col, Typography } from "antd";
import UploadDragger from "../../../../../commons/UploadDragger/UploadDragger";
import UploadList from "../../../../../commons/UploadList/UploadList";
const VendorProfileForm = ({
  formEN,
  formJP,
  formTL,
  formVI,
  formZH,
  className,
}) => {
  const [imageInsideUrl, setImageInsideUrl] = React.useState();
  const [base64ImageInside, setBase64ImageInside] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [listBase64ImageOutSide, setListBase64ImageOutSide] = useState();

  const onChangeImageOutside = (listBase64Image) => {
    setListBase64ImageOutSide(listBase64Image);
  };

  const onChangeImageInside = (base64Image) => {
    setBase64ImageInside(base64Image);
  };

  return (
    <div className={`vendor-profile-form ${className}`}>
      <Row justify="center" className="control-image">
        <Col span={12}>
          <Row justify="center">
            <Col span={24}>
              <Typography.Title level={4} style={{ textAlign: "center" }}>
                Image Inside
              </Typography.Title>
            </Col>
            <Col span={24}>
              <UploadDragger
                onChangeImage={onChangeImageInside}
                imageUrlProps={imageInsideUrl}
                loading={loading}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="center">
            <Col span={24}>
              <Typography.Title level={4} style={{ textAlign: "center" }}>
                Image OutSide
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Row justify="center">
                <UploadList onChangeFileList={onChangeImageOutside} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <TranslateVendorForm
        formEN={formEN}
        formJP={formJP}
        formTL={formTL}
        formZH={formZH}
        formVI={formVI}
      />
    </div>
  );
};

export default VendorProfileForm;
