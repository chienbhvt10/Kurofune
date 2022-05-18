import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import InputField from "../../../../../commons/Form/InputField";
import RenderApiErrorMessage from "../../../../../commons/RenderErrorMessage/RenderApiErrorMessage";

const CommonInfoForm = ({ className, form }) => {
  const response = useSelector((state) => state.userState.response);
  return (
    <Form
      className={className}
      name="common-address-form"
      form={form}
      autoComplete="off"
    >
      <Row justify="center">
        <Col span={12}>
          <InputField
            field="postal_code"
            label="Postal code"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="prefecture"
            label="Prefecture"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            label="City"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="street_address"
            label="Street address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            type={<Input />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="building"
            label="Building"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={response}
            type={<Input />}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default CommonInfoForm;
