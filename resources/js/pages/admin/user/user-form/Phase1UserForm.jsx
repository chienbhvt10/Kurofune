import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { userFormOptions } from "../../../../commons/data";
import InputField from "../../../../commons/Form/InputField";
import SelectField from "../../../../commons/Form/SelectField";
import FormHeader from "../../../../commons/FormHeader";
import { formatDate, generatePassword } from "../../../../commons/string.js";
import UploadDragger from "../../../../commons/UploadDragger/UploadDragger";
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
  const { i18n, t } = useTranslation();
  const { roles, getAllRoles } = useRoles();
  const [role, setRole] = useState();
  const [avatarState, setAvatarState] = useState({
    avatarUrl: undefined,
    base64Avatar: undefined,
    loading: false,
  });
  const lang = localStorage.getItem("lang");
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
    if (userInfoForm.getFieldValue("role") === "vendor") {
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
      userInfoForm.getFieldValue("role") === "light plan" ||
      userInfoForm.getFieldValue("role") === "full support plan"
    ) {
      submitValues = {
        ...submitValues,
        ...planProfileForm.getFieldsValue(),
        dob: formatDate(planProfileForm.getFieldValue("dob")),
        start_date_education: formatDate(
          planProfileForm.getFieldValue("start_date_education")
        ),
        end_date_education: formatDate(
          planProfileForm.getFieldValue("end_date_education")
        ),
      };
    }
    onSave(submitValues);
  };
  const userInfoInitValues = getUserInfoInitValues(item);
  const planInitValues = getPlanInitValues(item);
  const translateInitValues = getTranslateInitValues();
  const commonAddressInitValues = getCommonAddressInitValues(item);
  const billingAddressInitValues = getBillingAddressInitValues(item);
  const shippingAddressInitValues = getShippingAddressInitValues(item);

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
    const password = generatePassword(12);
    userInfoForm.setFieldsValue({ ...userInfoForm.getFieldsValue(), password });
  };

  const onChangeRole = (values) => {
    setRole(values);
  };

  const onChangeAvatar = (base64Image) => {
    setAvatarState({ base64Avatar: base64Image });
  };
  React.useEffect(() => {
    setAvatarState({ imageUrl: item?.avatar || "" });
  }, [item]);
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
            { name: "User List", routerLink: `${lang}/admin/user-list` },
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
                label="Role"
                name="role"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                hasFeedback
                rules={[{ required: true, message: "" }]}
                validateStatus={"danger"}
              >
                <Select
                  placeholder="Please select a role"
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
                label="Name"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[{ required: true, message: "Please input your name!" }]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="email"
                label="Email"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="phone"
                label="Phone"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <InputField
                field="username"
                label="Username"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={23}>
              <Row justify="space-between">
                <Col span={18}>
                  <InputField
                    field="password"
                    label="Password"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    rules={[]}
                    response={response}
                    type={<Input />}
                  />
                </Col>
                <Col span={4}>
                  <Button type="button" onClick={onGeneratePassword}>
                    Generate
                  </Button>
                </Col>
                <Col span={24}></Col>
              </Row>
            </Col>
            <Col span={23}>
              <SelectField
                field="active"
                label="Active"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                rules={[
                  { required: true, message: "Please select active status!" },
                ]}
                response={response}
                placeholder="Please select active status"
                options={userFormOptions.active_status}
              />
            </Col>
          </Col>
        </Row>
      </Form>

      <div className="translate-role">
        <Phase2UserForm
          role={role}
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
