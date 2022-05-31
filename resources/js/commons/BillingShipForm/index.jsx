import { Col, Form, Input, Row } from "antd";
import React from "react";
import { validateUser } from "../../helper/validateField";
import { PREF } from "../data";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";

const BillingShipForm = ({ className, form, typeForm, response }) => {
  return (
    <Form
      className={className + " billing-shipping-form"}
      name={`${typeForm}-info-form`}
      form={form}
    >
      <Row justify="center">
        <Col span={12}>
          <InputField
            field="full_name"
            errorField={`${typeForm}.full_name`}
            label="Full Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="postal_code"
            errorField={`${typeForm}.postal_code`}
            label="Postal code"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={validateUser.billing_shipping.postal_code}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <SelectField
            field="prefecture"
            errorField={`${typeForm}.prefecture`}
            label="Prefecture"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            placeholder="Please select prefecture"
            options={PREF}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            errorField={`${typeForm}.city`}
            label="City"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="street_address"
            errorField={`${typeForm}.street_address`}
            label="Street address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="building"
            errorField={`${typeForm}.building`}
            label="Building"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="phone"
            errorField={`${typeForm}.phone`}
            label="Phone"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            rules={validateUser.billing_shipping.phone}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="email"
            errorField={`${typeForm}.email`}
            label="Email"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            rules={validateUser.billing_shipping.email}
            type={<Input className="input-field" />}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default BillingShipForm;
