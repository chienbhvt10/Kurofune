import React from "react";
import { Form, Select } from "antd";
const SelectField = ({
  field,
  errorField,
  label,
  labelCol,
  wrapperCol,
  rules,
  response,
  placeholder,
  options,
  mode,
  disabled,
  className
}) => {
  return (
    <Form.Item
      className={className}
      name={field}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      rules={rules}
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
      <Select placeholder={placeholder} disabled={disabled} mode={mode}>
        {options?.map((option, index) => (
          <Select.Option key={index} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
