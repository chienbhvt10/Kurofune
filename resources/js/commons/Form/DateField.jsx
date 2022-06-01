import React from "react";
import { Form, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
const DateField = ({
  field,
  errorField,
  label,
  labelCol,
  wrapperCol,
  rules,
  locale,
  response,
}) => {
  const dateFormat = "YYYY/MM/DD";
  const { t } = useTranslation();
  return (
    <Form.Item
      name={field}
      label={label}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      hasFeedback
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
      <DatePicker
        style={{ width: "100%" }}
        locale={locale}
        format={dateFormat}
        placeholder={t("admins.user.form.placeholder.select_date")}
      />
    </Form.Item>
  );
};

export default DateField;
