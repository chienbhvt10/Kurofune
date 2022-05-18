import React from "react";
import { Form, Select } from "antd";
const SelectField = ({
  field,
  label,
  labelCol,
  wrapperCol,
  rules,
  response,
  placeholder,
  options,
}) => {
  return (
    <Form.Item
      name={field}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      rules={rules}
      help={
        response?.message?.[field] &&
        response?.message?.[field].length &&
        response?.message?.[field][0]
      }
      validateStatus={
        response?.message?.[field] && response?.message?.[field].length
          ? "error"
          : ""
      }
    >
      <Select placeholder={placeholder}>
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
