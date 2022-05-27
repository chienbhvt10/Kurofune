import { Form } from "antd";
import React from "react";
const InputField = ({
  label,
  field,
  errorField,
  labelCol,
  wrapperCol,
  rules,
  response,
  type,
  className,
  dependencies,
  value,
}) => {
  return (
    <Form.Item
      className={className}
      label={label}
      name={field}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      rules={rules}
      dependencies={dependencies}
      value={value}
      hasFeedback
      help={
        response?.message?.[errorField] &&
        response?.message?.[errorField].length &&
        response?.message?.[errorField][0]
      }
      validateStatus={
        response?.message?.[errorField] &&
        response?.message?.[errorField].length
          ? "error"
          : ""
      }
    >
      {type}
    </Form.Item>
  );
};

export default InputField;
