import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { userFormOptions } from "../../../../commons/data";
import InputField from "../../../../commons/Form/InputField";
import SelectField from "../../../../commons/Form/SelectField";
import FormHeader from "../../../../commons/FormHeader";
import { formatDate, generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger";
import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
  ROLE_VENDOR,
  TYPE_FORM_CREATE,
  TYPE_FORM_UPDATE,
} from "../../../../constants";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { validateUser } from "../../../../helper/validateField";
import useRoles from "../../../../hooks/role/useRoles";
import Phase2UserForm from "./Phase2UserForm";
import "./user-form.scss";
import {
  getBillingAddressInitValues,
  getCommonAddressInitValues,
  getPlanInitValues,
  getShippingAddressInitValues,
  getTranslateInitValues,
  getUserInfoInitValues,
} from "./userFormInitValues";
export const UserForm = ({
  item,
  typeForm,
  onCancel,
  onSave,
  title,
  response,
}) => {
  const { t } = useTranslation();
  const { roles, getAllRoles } = useRoles();
  const [role, setRole] = React.useState();
  const [avatarState, setAvatarState] = React.useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const lang = getCurrentLanguage();
  const [userInfoForm] = Form.useForm();
  const [planProfileForm] = Form.useForm();
  const [vendorProfileFormEN] = Form.useForm();
  const [vendorProfileFormJP] = Form.useForm();
  const [vendorProfileFormTL] = Form.useForm();
  const [vendorProfileFormVI] = Form.useForm();
  const [vendorProfileFormZH] = Form.useForm();
  const [commonAddressForm] = Form.useForm();
  const [billingAddressForm] = Form.useForm();
  const [shippingAddressForm] = Form.useForm();

  const userInfoInitValues = getUserInfoInitValues(item);
  const planInitValues = getPlanInitValues(item);
  const translateInitValues = getTranslateInitValues();
  const commonAddressInitValues = getCommonAddressInitValues(item);
  const billingAddressInitValues = getBillingAddressInitValues(item);
  const shippingAddressInitValues = getShippingAddressInitValues(item);

  const onFinishAll = () => {
    let submitValues = {
      id: userInfoInitValues.id,
      avatar: avatarState.base64Avatar,
      ...userInfoForm.getFieldsValue(),
      ...commonAddressForm.getFieldsValue(),
      billing_address: {
        ...billingAddressForm.getFieldsValue(),
      },
      shipping_address: {
        ...shippingAddressForm.getFieldsValue(),
      },
    };
    if (!userInfoForm.getFieldValue("password")) {
      delete submitValues.password;
    }
    if (userInfoForm.getFieldValue("role") === ROLE_VENDOR) {
      submitValues = {
        ...submitValues,
        ja: {
          ...vendorProfileFormJP.getFieldsValue(),
        },
        en: {
          ...vendorProfileFormEN.getFieldsValue(),
        },
        zh: {
          ...vendorProfileFormZH.getFieldsValue(),
        },
        tl: {
          ...vendorProfileFormTL.getFieldsValue(),
        },
        vi: {
          ...vendorProfileFormVI.getFieldsValue(),
        },
      };
    }
    if (
      userInfoForm.getFieldValue("role") === ROLE_LIGHT_PLAN ||
      userInfoForm.getFieldValue("role") === ROLE_FULL_SUPPORT_PLAN
    ) {
      submitValues = {
        ...submitValues,
        ...planProfileForm.getFieldsValue(),
        dob: planProfileForm.getFieldValue("dob")
          ? formatDate(planProfileForm.getFieldValue("dob"))
          : "",
        start_date_education: planProfileForm.getFieldValue(
          "start_date_education"
        )
          ? formatDate(planProfileForm.getFieldValue("start_date_education"))
          : "",
        end_date_education: planProfileForm.getFieldValue("end_date_education")
          ? formatDate(planProfileForm.getFieldValue("end_date_education"))
          : "",
      };
    }
    onSave(submitValues);
  };

  React.useEffect(() => {
    userInfoForm.setFieldsValue(userInfoInitValues);
    planProfileForm.setFieldsValue(planInitValues);
    billingAddressForm.setFieldsValue(billingAddressInitValues);
    shippingAddressForm.setFieldsValue(shippingAddressInitValues);
    commonAddressForm.setFieldsValue(commonAddressInitValues);
    vendorProfileFormEN.setFieldsValue(
      item?.vendor_profile?.vendor_translations[0] || translateInitValues
    );
    vendorProfileFormJP.setFieldsValue(
      item?.vendor_profile?.vendor_translations[1] || translateInitValues
    );
    vendorProfileFormTL.setFieldsValue(
      item?.vendor_profile?.vendor_translations[2] || translateInitValues
    );
    vendorProfileFormVI.setFieldsValue(
      item?.vendor_profile?.vendor_translations[3] || translateInitValues
    );
    vendorProfileFormZH.setFieldsValue(
      item?.vendor_profile?.vendor_translations[4] || translateInitValues
    );
  }, [item]);

  React.useEffect(() => {
    if (roles.length === 0) {
      getAllRoles();
    }
  }, [roles]);

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

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };

  React.useEffect(() => {
    setAvatarState({ avatarUrl: item?.avatar || "" });
  }, [item]);

  const renderErrorTranslate = (field) => {
    return validateUser?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

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
        />
        <Row justify="center" style={{ marginTop: 30 }}>
          <Col span={8}>
            <UploadDragger
              onChangeImage={onChangeAvatar}
              imageUrlProps={avatarState.avatarUrl}
              loading={avatarState.loading}
            />
          </Col>
          <Col span={14}>
            <Col span={23}>
              <Form.Item
                name="role"
                errorField="role"
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
                errorField="name"
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
                errorField="email"
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
                errorField="phone"
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
                errorField="username"
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
                    errorField="password"
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
                    onClick={onGeneratePassword}
                  >
                    {t("admins.btn_generate_password")}
                  </Button>
                </Col>
                <Col span={24}></Col>
              </Row>
            </Col>
            <Col span={23}>
              <SelectField
                field="active"
                errorField="active"
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
        />
      </div>
    </div>
  );
};
