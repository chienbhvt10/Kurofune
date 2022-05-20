import React from "react";
import TranslateVendorForm from "./TranslateVendorForm";
import { Row, Col } from "antd";
import UploadDragger from "../../../../../commons/UploadDragger";
const VendorProfileForm = ({
  formEN,
  formJP,
  formTL,
  formVI,
  formZH,
  className,
}) => {
  return (
    <div className={`vendor-profile-form ${className}`}>
      <Row justify="center" className="control-image">
        <Col span={12}>
          <Row justify="center">
            <UploadDragger title="Image1" name="image1" />
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="center">
            <UploadDragger title="Image2" name="image2" />
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
