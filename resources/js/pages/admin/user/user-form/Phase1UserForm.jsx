import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { userFormOptions } from "../../../../commons/data";
import InputField from "../../../../commons/Form/InputField";
import SelectField from "../../../../commons/Form/SelectField";
import FormHeader from "../../../../commons/FormHeader";
import { generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger";
import {
  FIRST_TAB,
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  TYPE_FORM_CREATE,
  TYPE_FORM_UPDATE,
  VIETNAMESE_DIACRITIC_CHARACTERS,
} from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { validateUser } from "../../../../helper/validateField";
import useRoles from "../../../../hooks/role/useRoles";
import useHandleForm from "../hooks/useHandleForm";
import Phase2UserForm from "./Phase2UserForm";
import "./user-form.scss";
import { isAdmin, isRolePlan, isVendor } from "../../../../helper/checker";
export const UserForm = (props) => {
  const { item, typeForm, onCancel, onSave, title, response, loading } = props;
  const { t } = useTranslation();
  const { roles } = useRoles();
  const [role, setRole] = React.useState();
  const [avatarUrl, setAvatarUrl] = React.useState();
  const [insideImageUrl, setInsideImageUrl] = React.useState();
  const [outSideImageUrl, setOutSideImageUrl] = React.useState();
  const [activeTab, setActiveTab] = React.useState(FIRST_TAB);

  const {
    billingAddressForm,
    commonAddressForm,
    onFinishAll,
    onFinishAllFailed,
    onSaveDeletedImage,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    onSaveImgInsideDelete,
    onSaveImgOutsideDelete,
    shippingAddressForm,
    userInfoForm,
    vendorProfileFormEN,
    vendorProfileFormJP,
    vendorProfileFormTL,
    vendorProfileFormVI,
    vendorProfileFormZH,
    userInfoInitValues,
    planProfileForm,
    setIsRemoveAvatar,
  } = useHandleForm(item, onSave, typeForm);

  React.useEffect(() => {
    setRole(userInfoForm.getFieldValue("role"));
  }, [item]);

  const onGeneratePassword = () => {
    const password = generatePassword(16);
    userInfoForm.setFieldsValue({ ...userInfoForm.getFieldsValue(), password });
  };

  const onChangeRole = (values) => {
    setRole(values);
    setActiveTab(FIRST_TAB);
  };


  React.useEffect(() => {
    setAvatarUrl(item?.avatar || "");
    setOutSideImageUrl(item?.vendor_profile?.images_outside || undefined);
    setInsideImageUrl(item?.vendor_profile?.images_inside || undefined);
  }, [item]);

  const renderErrorTranslate = (field) => {
    let validator = validateUser?.[field];
    if (typeForm === TYPE_FORM_UPDATE && field === "password") {
      validator = validateUser.password.slice(1);
    }
    return validator.map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };
  const getDepend = () => document.querySelector("#role-select");
  return (
    <div className="user-form">
      <Form
        encType="multipart/form-data"
        name="common-info-form"
        form={userInfoForm}
        onFinish={onFinishAll}
        onFinishFailed={onFinishAllFailed}
        autoComplete="off"
        initialValues={{
          ...userInfoInitValues,
        }}
      >
        <FormHeader
          breadcrumb={[]}
          title={title}
          onCancel={onCancel}
          loading={loading}
        />
        <Row justify="center" style={{ marginTop: 30 }}>
          <Col span={8}>
            <UploadDragger
              setIsRemoveImage={setIsRemoveAvatar}
              onChangeImage={onChangeAvatar}
              imageUrlProps={avatarUrl}
            />
          </Col>
          <Col span={14}>
            <Col span={23} id="role-select">
              <Form.Item
                name="role"
                error="role"
                label={t("admins.user.form.field_role")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                hasFeedback
                rules={renderErrorTranslate("role")}
                validateStatus={"danger"}
              >
                <Select
                  placeholder={t("admins.user.form.placeholder.select_role")}
                  onChange={onChangeRole}
                  getPopupContainer={getDepend}
                  disabled={
                    typeForm === TYPE_FORM_UPDATE &&
                    (isAdmin(item?.role) || isVendor(item?.role))
                  }
                >
                  {roles
                    .filter((item) =>
                      typeForm === TYPE_FORM_UPDATE
                        ? isRolePlan(item.name)
                        : item
                    )
                    .map((item, index) => (
                      <Select.Option key={index} value={item.name}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={23}>
              <InputField
                field="name"
                error="name"
                label={t("admins.user.form.field_name")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("name")}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="name_furigana"
                error="name_furigana"
                label={t("admins.user.form.field_name_furigana")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="email"
                error="email"
                label={t("admins.user.form.field_email")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[
                  ...renderErrorTranslate("email"),
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        VIETNAMESE_DIACRITIC_CHARACTERS.some((character) =>
                          getFieldValue("email")
                            .toUpperCase()
                            .includes(character)
                        )
                      ) {
                        return Promise.reject(
                          t("admins.user.error.email.type")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="phone"
                error="phone"
                label={t("admins.user.form.field_phone")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("phone")}
                response={response}
                type={<Input/>}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="username"
                error="username"
                label={t("admins.user.form.field_username")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("user_name")}
                response={response}
                type={<Input disabled={typeForm === TYPE_FORM_UPDATE} />}
              />
            </Col>
            <Col span={23}>
              <Row justify="space-between">
                <Col span={18}>
                  <InputField
                    field="password"
                    error="password"
                    label={t("admins.user.form.field_password")}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    rules={renderErrorTranslate("password")}
                    response={response}
                    type={<Input />}
                  />
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    htmlType="button"
                    className="btn-generate-password"
                    onClick={onGeneratePassword}
                  >
                    {t("admins.btn_generate_password")}
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={23}>
              <SelectField
                field="language"
                error="language"
                label={t("admins.user.form.field_language")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("language")}
                response={response}
                placeholder={t("admins.user.form.placeholder.select_language")}
                options={userFormOptions.LANGUAGES}
              />
            </Col>
            <Col span={23}>
              <SelectField
                field="active"
                error="active"
                label={t("admins.user.form.field_active")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("active")}
                response={response}
                // disabled={isDisabledSelectActive}
                placeholder={t(
                  "admins.user.form.placeholder.select_active_status"
                )}
                options={userFormOptions.active_status}
              />
            </Col>
          </Col>
        </Row>
      </Form>

      <div className="translate-role">
        <Phase2UserForm
          role={role}
          typeForm={typeForm}
          vendorProfileFormJP={vendorProfileFormJP}
          vendorProfileFormEN={vendorProfileFormEN}
          vendorProfileFormTL={vendorProfileFormTL}
          vendorProfileFormVI={vendorProfileFormVI}
          vendorProfileFormZH={vendorProfileFormZH}
          planProfileForm={planProfileForm}
          commonAddressForm={commonAddressForm}
          billingAddressForm={billingAddressForm}
          shippingAddressForm={shippingAddressForm}
          onSaveDeletedImage={onSaveDeletedImage}
          insideImageUrl={insideImageUrl}
          outSideImageUrl={outSideImageUrl}
          onChangeImageInside={onChangeImageInside}
          onChangeImageOutside={onChangeImageOutside}
          onSaveImgInsideDelete={onSaveImgInsideDelete}
          onSaveImgOutsideDelete={onSaveImgOutsideDelete}
          setInsideImageUrl={setInsideImageUrl}
          setOutSideImageUrl={setOutSideImageUrl}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};
