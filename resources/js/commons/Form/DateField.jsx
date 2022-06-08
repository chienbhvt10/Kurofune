import React from "react";
import { Form, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
const DateField = ({
  field,
  error,
  label,
  labelCol,
  wrapperCol,
  rules,
  locale,
  response,
  dependId,
}) => {
  const dateFormat = "YYYY/MM/DD";
  const { t } = useTranslation();
  const getDepend = () =>
    document.querySelector(`#${dependId || field}-pick-date`);
  return (
    <div id={`${dependId || field}-pick-date`} style={{ position: "relative" }}>
      <Form.Item
        name={field}
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        hasFeedback
        rules={rules}
        help={
          response?.message?.[error] &&
          response?.message?.[error].length &&
          response?.message?.[error][0]
        }
        validateStatus={
          response?.message?.[error] && response?.message?.[error].length
            ? "error"
            : ""
        }
      >
        <DatePicker
          getPopupContainer={getDepend}
          style={{ width: "100%" }}
          locale={locale}
          format={dateFormat}
          placeholder={t("admins.user.form.placeholder.select_date")}
        />
      </Form.Item>
    </div>
  );
};

export default DateField;
