import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { PREF } from "../../../../../commons/data";
import InputField from "../../../../../commons/Form/InputField";
import SelectField from "../../../../../commons/Form/SelectField";
import { validateUser } from "../../../../../helper/validateField";

const CommonInfoForm = ({ className, form }) => {
  const resCreateUser = useSelector((state) => state.userState.resCreateUser);
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
            errorField="postal_code"
            label="Postal code"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={validateUser.postal_code}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <SelectField
            field="prefecture"
            errorField="prefecture"
            label="Prefecture"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={resCreateUser}
            placeholder="Please select prefecture"
            options={PREF}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            errorField="city"
            label="City"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="street_address"
            errorField="street_address"
            label="Street address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={[]}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="building"
            errorField="building"
            label="Building"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 23 }}
            rules={[]}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default CommonInfoForm;
