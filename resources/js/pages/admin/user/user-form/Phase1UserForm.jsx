import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { userFormOptions } from "../../../../commons/data";
import InputField from "../../../../commons/Form/InputField";
import SelectField from "../../../../commons/Form/SelectField";
import FormHeader from "../../../../commons/FormHeader";
import { generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger";
import { TYPE_FORM_CREATE, TYPE_FORM_UPDATE } from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { validateUser } from "../../../../helper/validateField";
import useRoles from "../../../../hooks/role/useRoles";
import useHandleForm from "../hooks/useHandleForm";
import Phase2UserForm from "./Phase2UserForm";
import "./user-form.scss";
export const UserForm = ({
  item,
  typeForm,
  onCancel,
  onSave,
  title,
  response,
  loading,
}) => {
  const { t } = useTranslation();
  const { roles } = useRoles();
  const [role, setRole] = React.useState();
  const [avatarUrl, setAvatarUrl] = React.useState();
  const [insideImageUrl, setInsideImageUrl] = React.useState();
  const [outSideImageUrl, setOutSideImageUrl] = React.useState();

  const {
    billingAddressForm,
    commonAddressForm,
    onFinishAll,
    onChangeAvatar,
    onChangeImageInside,
    onChangeImageOutside,
    shippingAddressForm,
    userInfoForm,
    vendorProfileFormEN,
    vendorProfileFormJP,
    vendorProfileFormTL,
    vendorProfileFormVI,
    vendorProfileFormZH,
    userInfoInitValues,
    planProfileForm,
  } = useHandleForm(item, onSave);

  const lang = getCurrentLanguage();

  React.useEffect(() => {
    setRole(userInfoForm.getFieldValue("role"));
  }, [item]);

  const onGeneratePassword = () => {
    const password = generatePassword(16);
    userInfoForm.setFieldsValue({ ...userInfoForm.getFieldsValue(), password });
  };

  const onChangeRole = (values) => {
    setRole(values);
  };

  React.useEffect(() => {
    setAvatarUrl(item?.avatar || "");
    setOutSideImageUrl(item?.vendor_profile?.images_outside || undefined);
    setInsideImageUrl(item?.vendor_profile?.images_inside || undefined);
  }, [item]);

  const renderErrorTranslate = (field) => {
    return validateUser?.[field].map((item) => {
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
        autoComplete="off"
        initialValues={{
          ...userInfoInitValues,
        }}
      >
        <FormHeader
          breadcrumb={[
            { name: "Home", routerLink: "../" },
            {
              name: t("admins.user.list.title"),
              routerLink: `${lang}/admin/user-list`,
            },
            {
              name: title,
              routerLink: "",
            },
          ]}
          title={title}
          onCancel={onCancel}
          loading={loading}
        />
        <Row justify="center" style={{ marginTop: 30 }}>
          <Col span={8}>
            <UploadDragger
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
                >
                  {roles.map((item, index) => (
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
                field="email"
                error="email"
                label={t("admins.user.form.field_email")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("email")}
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
                type={<Input />}
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
                    rules={
                      typeForm === TYPE_FORM_CREATE &&
                      renderErrorTranslate("password")
                    }
                    response={response}
                    type={<Input />}
                  />
                </Col>
                <Col span={4}>
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
                field="active"
                error="active"
                label={t("admins.user.form.field_active")}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={renderErrorTranslate("active")}
                response={response}
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
          onChangeImageInside={onChangeImageInside}
          onChangeImageOutside={onChangeImageOutside}
          insideImageUrl={insideImageUrl}
          outSideImageUrl={outSideImageUrl}
        />
      </div>
    </div>
  );
};
