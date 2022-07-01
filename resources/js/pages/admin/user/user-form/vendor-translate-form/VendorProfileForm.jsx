import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import UploadList from "../../../../../commons/UploadList/UploadList";
import TranslateVendorForm from "./TranslateVendorForm";
const VendorProfileForm = (props) => {
  const {
    formEN,
    formJP,
    formTL,
    formVI,
    formZH,
    className,
    onChangeImageOutside,
    onChangeImageInside,
    outSideImageUrl,
    insideImageUrl,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    setInsideImageUrl,
    setOutSideImageUrl,
    tabRequiredLang,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={`vendor-profile-form ${className}`}>
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
                onSaveDeletedImage={onSaveImgInsideDelete}
                onChangeFileList={onChangeImageInside}
                stateImageUrl={insideImageUrl}
                setStateImageUrl={setInsideImageUrl}
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
                  onSaveDeletedImage={onSaveImgOutsideDelete}
                  onChangeFileList={onChangeImageOutside}
                  stateImageUrl={outSideImageUrl}
                  setStateImageUrl={setOutSideImageUrl}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <TranslateVendorForm
        tabRequiredLang={tabRequiredLang}
        formEN={formEN}
        formJP={formJP}
        formTL={formTL}
        formVI={formVI}
        formZH={formZH}
      />
    </div>
  );
};

export default VendorProfileForm;
