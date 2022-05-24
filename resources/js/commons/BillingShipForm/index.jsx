import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import InputField from "../Form/InputField";

const BillingShipForm = ({ lang, className, form, typeForm }) => {
  const response = useSelector((state) => state.userState.response);

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
            label="Full Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            typeForm={typeForm}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="postal_code"
            label="Postal code"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="prefecture"
            label="Prefecture"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            label="City"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="street_address"
            label="Street address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="building"
            label="Building"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="phone"
            label="Phone"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="email"
            label="Email"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input className="input-field" />}
            typeForm={typeForm}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default BillingShipForm;
