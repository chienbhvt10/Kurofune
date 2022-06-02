import { Col, Form, Row, Tabs, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import UploadDragger from "../../../../../commons/UploadDragger/UploadDragger";
import UploadList from "../../../../../commons/UploadList/UploadList";
import {
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
} from "../../../../../constants";
import SubFormUserTranslate from "./SubFormTranslate";
const VendorProfileForm = ({
  formEN,
  formJP,
  formTL,
  formVI,
  formZH,
  formUpload,
  className,
  onChangeImageOutside,
  onChangeImageInside,
  outSideImageUrl,
  insideImageUrl,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`vendor-profile-form ${className}`}>
      <Form form={formUpload}>
        <Row justify="center" className="control-image">
          <Col span={12}>
            <Row justify="center">
              <Col span={24}>
                <Typography.Title level={5} style={{ textAlign: "center" }}>
                  {t("admins.user.form.vendor_profile.field_image_inside")}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <UploadList
                  onChangeFileList={onChangeImageInside}
                  fileListUrlProps={insideImageUrl}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="center">
              <Col span={24}>
                <Typography.Title level={5} style={{ textAlign: "center" }}>
                  {t("admins.user.form.vendor_profile.field_image_outside")}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  <UploadList
                    onChangeFileList={onChangeImageOutside}
                    fileListUrlProps={outSideImageUrl}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Tabs defaultActiveKey="1" className="switch-tab-form">
        <Tabs.TabPane tab="English" key="1">
          <SubFormUserTranslate lang={LANG_ENGLISH} form={formEN} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Japanese" key="2">
          <SubFormUserTranslate lang={LANG_JAPANESE} form={formJP} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Philippines" key="3">
          <SubFormUserTranslate lang={LANG_PHILIPPINES} form={formTL} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vietnamese" key="4">
          <SubFormUserTranslate lang={LANG_VIETNAMESE} form={formVI} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chinese" key="5">
          <SubFormUserTranslate lang={LANG_CHINESE} form={formZH} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default VendorProfileForm;
