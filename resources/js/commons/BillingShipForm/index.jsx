import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { validateUser } from "../../helper/validateField";
import { PREF } from "../data";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";

const BillingShipForm = ({ className, form, typeForm, response }) => {
  const { t } = useTranslation();

  const renderErrorTranslate = (field) => {
    return validateUser?.billing_shipping?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <Form
      className={className + " billing-shipping-form"}
      name={`${typeForm}-info-form`}
      form={form}
    >
      <Row justify="center">
        <Col span={12}>
          <InputField
            field={`${typeForm}_full_name`}
            error={`${typeForm}.full_name`}
            label={t("admins.user.form.field_full_name")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_postal_code`}
            error={`${typeForm}.postal_code`}
            label={t("admins.user.form.field_postal_code")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("postal_code")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <SelectField
            field={`${typeForm}_prefecture`}
            error={`${typeForm}.prefecture`}
            label={t("admins.user.form.field_prefecture")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            placeholder={t("admins.user.form.placeholder.select_prefecture")}
            options={PREF}
            dependId={`${typeForm}-prefecture`}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_city`}
            error={`${typeForm}.city`}
            label={t("admins.user.form.field_city")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_street_address`}
            error={`${typeForm}.street_address`}
            label={t("admins.user.form.field_street")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_building`}
            error={`${typeForm}.building`}
            label={t("admins.user.form.field_building")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_phone`}
            error={`${typeForm}.phone`}
            label={t("admins.user.form.field_phone")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            rules={renderErrorTranslate("phone")}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field={`${typeForm}_email`}
            error={`${typeForm}.email`}
            label={t("admins.user.form.field_email")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            rules={renderErrorTranslate("email")}
            type={<Input className="input-field" />}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default BillingShipForm;
