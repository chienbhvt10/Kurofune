import { Col, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useTranslation } from "react-i18next";
import { validateUser } from "../../helper/validateField";
import { PREF } from "../data";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";
import SelectFieldSearch from "../Form/SelectFieldSearch";

const BillingShipForm = ({ className, form, typeForm, response,onFinish }) => {
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
            field="first_name"
            error={`${typeForm}.first_name`}
            label={t("admins.user.form.order.field_first_name")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("first_name")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="last_name"
            error={`${typeForm}.last_name`}
            label={t("admins.user.form.order.field_last_name")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("last_name")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="company"
            error={`${typeForm}.company`}
            label={t("admins.user.form.order.field_company")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 23 }}
            rules={renderErrorTranslate("company")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="address_line_1"
            error={`${typeForm}.address_line_1`}
            label={t("admins.user.form.order.field_address_line_1")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            // rules={renderErrorTranslate("address_line_1")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="address_line_2"
            error={`${typeForm}.address_line_2`}
            label={t("admins.user.form.order.field_address_line_2")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            // rules={renderErrorTranslate("address_line_2")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            error={`${typeForm}.city`}
            label={t("admins.user.form.order.field_city")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="postal_code"
            error={`${typeForm}.postcode`}
            label={t("admins.user.form.order.field_postal_code")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("postal_code")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <SelectFieldSearch
            field="country_region"
            error={`${typeForm}.country_region`}
            label={t("admins.user.form.order.field_country_region")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("country_region")}
            // response={response}
            options={PREF}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="state_county"
            error={`${typeForm}.state_county`}
            label={t("admins.user.form.order.field_state_county")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("state_county")}
            // response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        {typeForm === 'billing' ?
          <>
            <Col span={12}>
              <InputField
                field="email"
                error={`${typeForm}.email`}
                label={t("admins.user.form.order.field_email")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 22 }}
                // response={response}
                rules={renderErrorTranslate("email")}
                type={<Input className="input-field" />}
              />
            </Col>
            <Col span={12}>
              <InputField
                field="phone"
                error={`${typeForm}.phone`}
                label={t("admins.user.form.order.field_phone")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 22 }}
                rules={renderErrorTranslate("phone")}
                type={<Input className="input-field" />}
              />
            </Col>
            <Col span={24}>
              <SelectField
                field="payment_method"
                error={`${typeForm}.payment_method`}
                label={t("admins.user.form.order.field_payment_method")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                // response={response}
                options={[{ value: 'N/A', label: 'N/A' }, { value: 'Cash on delivery', label: 'Cash on delivery' }, { value: 'Other', label: 'Other' }]}
              />
            </Col>
            <Col span={24}>
              <InputField
                field="transaction_id"
                error={`${typeForm}.transaction_id`}
                label={t("admins.user.form.order.field_transaction_id")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                // rules={renderErrorTranslate("transaction_id")}
                type={<Input className="input-field" />}
              />
            </Col>
          </>
          :
          <>
            <Col span={24}>
              <InputField
                field="phone"
                error={`${typeForm}.phone`}
                label={t("admins.user.form.order.field_phone")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 11 }}
                rules={renderErrorTranslate("phone")}
                type={<Input className="input-field" />}
              />
            </Col>
            <Col span={24}>
              <InputField
                field="customer_provided_note"
                error={`${typeForm}.customer_provided_note`}
                label={t("admins.user.form.order.field_customer_provided_note")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 23 }}
                type={<TextArea className="input-field" style={{ minHeight: 115 }} />}
              />
            </Col>
          </>
        }
      </Row>
    </Form>
  );
};

export default BillingShipForm;
