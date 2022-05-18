import { Form, Input, Row, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import InputField from "../Form/InputField";
import RenderApiErrorMessage from "../RenderErrorMessage/RenderApiErrorMessage";

const credential = Yup.object().shape({});

const BillingShipForm = ({ lang, className, form, typeForm }) => {
  const response = useSelector((state) => state.userState.response);

  return (
    <Form className={className} name={`${typeForm}-info-form`} form={form}>
      <Row justify="center">
        <Col span={12}>
          <InputField
            field="full_name"
            label="Full Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input />}
            typeForm={typeForm}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="postal_code"
            label="Postal code"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={response}
            type={<Input />}
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
            type={<Input />}
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
            type={<Input />}
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
            type={<Input />}
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
            type={<Input />}
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
            type={<Input />}
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
            type={<Input />}
            typeForm={typeForm}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default BillingShipForm;
