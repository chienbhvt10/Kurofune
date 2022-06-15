import { Form } from "antd";
import React from "react";
const InputField = ({
  label,
  field,
  error,
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
        response?.error_data?.[error] &&
        response?.error_data?.[error] &&
        response?.error_data?.[error][0]
      }
      validateStatus={
        (response?.message?.[error] && response?.message?.[error].length) ||
        response?.error_data?.[error]
          ? "error"
          : ""
      }
    >
      {type}
    </Form.Item>
  );
};

export default InputField;
