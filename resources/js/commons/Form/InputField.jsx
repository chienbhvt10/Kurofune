import { Form } from "antd";
import React from "react";

const InputField = ({
  label,
  field,
  labelCol,
  wrapperCol,
  rules,
  response,
  typeForm,
  type,
}) => {
  return (
    <Form.Item
      label={label}
      name={field}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      rules={rules}
      hasFeedback
      help={
        typeForm === "billing_address" || typeForm === "shipping_address"
          ? response?.message?.[`${typeForm}.${field}`] &&
            response?.message?.[`${typeForm}.${field}`].length &&
            response?.message?.[`${typeForm}.${field}`][0]
          : response?.message?.[field] &&
            response?.message?.[field].length &&
            response?.message?.[field][0]
      }
      validateStatus={
        (response?.message?.[field] && response?.message?.[field].length) ||
        (response?.message?.[`${typeForm}.${field}`] &&
          response?.message?.[`${typeForm}.${field}`].length)
          ? "error"
          : ""
      }
    >
      {type}
    </Form.Item>
  );
};

export default InputField;
