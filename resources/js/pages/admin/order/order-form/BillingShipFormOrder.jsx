import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PREF } from "../../../../commons/data";
import InputField from "../../../../commons/Form/InputField";
import { validateForm } from "./validateForm";

const { TextArea } = Input;

const BillingShipFormOrder = ({ className, form, typeForm, response, onFinish }) => {
  const { t } = useTranslation();

  const renderErrorTranslate = (field) => {
    return validateForm?.form_order?.[field].map((item) => {
      return {
        ...item,
        message: item.message,
      };
    });
  };

  return (
    <Form
      className={className + " billing-shipping-form"}
      name={`${typeForm}-info-form`}
      form={form}
    >
      {(values, form) => {
        const renderErrorMessage = (field) => {
          return (
            <div className="form-error">{form.getFieldError(field) && t(form.getFieldError(field)[0])}</div>
          );
        };
        return (
          <>
            <Row justify="center">
              <Col span={24}>
                <InputField
                  field="full_name"
                  error={`${typeForm}.full_name`}
                  label={t("admins.order.form.field_full_name")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("full_name")}
                  type={<Input className="input-field" />}
                />
                {renderErrorMessage('full_name')}
              </Col>
              <Col span={12}>
                <InputField
                  field="street_address"
                  error={`${typeForm}.street_address`}
                  label={t("admins.order.form.field_street_address")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("street_address")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
                {renderErrorMessage('street_address')}
              </Col>
              <Col span={12}>
                <InputField
                  field="building"
                  error={`${typeForm}.building`}
                  label={t("admins.order.form.field_building")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("building")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
                 {renderErrorMessage('building')}
              </Col>
              <Col span={12}>
                <InputField
                  field="city"
                  error={`${typeForm}.city`}
                  label={t("admins.order.form.field_city")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("city")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
                {renderErrorMessage('city')}
              </Col>
              <Col span={12}>
                <InputField
                  field="postal_code"
                  error={`${typeForm}.postcode`}
                  label={t("admins.order.form.field_postal_code")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("postal_code")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
                 {renderErrorMessage('postal_code')}
              </Col>
              <Col span={24}>
                <InputField
                  field="prefecture"
                  error={`${typeForm}.prefecture`}
                  label={t("admins.order.form.field_prefecture")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  rules={renderErrorTranslate("prefecture")}
                  // response={response}
                  type={<Input className="input-field" />}
                />
                {renderErrorMessage('prefecture')}
              </Col>
              {typeForm === 'billing' ?
                <>
                  <Col span={12}>
                    <InputField
                      field="email"
                      error={`${typeForm}.email`}
                      label={t("admins.order.form.field_email")}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 22 }}
                      // response={response}
                      rules={renderErrorTranslate("email")}
                      type={<Input className="input-field" />}
                    />
                    {renderErrorMessage('email')}
                  </Col>
                  <Col span={12}>
                    <InputField
                      field="phone"
                      error={`${typeForm}.phone`}
                      label={t("admins.order.form.field_phone")}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 22 }}
                      rules={renderErrorTranslate("phone")}
                      type={<Input className="input-field" />}
                    />
                    {renderErrorMessage('phone')}
                  </Col>
                  <Col span={24}>
                    {/* <SelectField
                      field="payment_method"
                      error={`${typeForm}.payment_method`}
                      label={t("admins.order.form.field_payment_method")}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 23 }}
                      // response={response}
                      options={[{ value: 'N/A', label: 'N/A' }, { value: 'Cash on delivery', label: 'Cash on delivery' }, { value: 'Other', label: 'Other' }]}
                    /> */}
                     <InputField
                      field="payment_method"
                      error={`${typeForm}.payment_method`}
                      label={t("admins.order.form.field_payment_method")}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 23 }}
                      // rules={renderErrorTranslate("transaction_id")}
                      type={<Input className="input-field" />}
                    />
                  </Col>
                </>
                :
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
                    {renderErrorMessage('email')}
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
                    {renderErrorMessage('phone')}
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
          </>
        );
      }}

    </Form>
  );
};

export default BillingShipFormOrder;
