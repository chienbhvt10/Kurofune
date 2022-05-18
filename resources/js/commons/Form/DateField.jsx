import React from "react";
import { Form, DatePicker } from "antd";
const DateField = ({
  field,
  label,
  labelCol,
  wrapperCol,
  rules,
  locale,
  response,
}) => {
  const dateFormat = "YYYY/MM/DD";

  return (
    <Form.Item
      name={field}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      hasFeedback
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
      <DatePicker
        style={{ width: "100%" }}
        locale={locale}
        format={dateFormat}
        placeholder="Select date"
      />
    </Form.Item>
  );
};

export default DateField;
