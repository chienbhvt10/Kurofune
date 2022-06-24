import React from "react";
import { Col, Form, Input, Row } from "antd";
import InputField from "../../../../commons/Form/InputField.jsx";
import { getCategoryFormLayout } from "./categoryInitValues.js";
import { useTranslation } from "react-i18next";

const SubFormCategoryTranslate = ({ lang, className, form, response }) => {
  const formItemLayout = getCategoryFormLayout();
  const { t } = useTranslation();
  return (
    <>
      <Form
        {...formItemLayout}
        className={className}
        name="common-translate-category-form"
        form={form}
      >
        {(values, form) => {
          const renderErrorMessage = (field) => {
            return (
              <div className="form-error">
                {form.getFieldError(field) && t(form.getFieldError(field)[0])}
              </div>
            );
          };
          return (
            <Row justify="center" className="input-field-space">
              <Col span={24}>
                <InputField
                  field={`${lang}_name`}
                  label={`(${lang}) ${t("admins.category.name_field")}`}
                  rules={[
                    {
                      required: true,
                      message: t("admins.category.error_message.error_name"),
                      whitespace: true,
                    },
                  ]}
                  response={response}
                  error={`${lang}_name`}
                  type={<Input />}
                />
                {renderErrorMessage("name")}
              </Col>
            </Row>
          );
        }}
      </Form>
    </>
  );
};

export default SubFormCategoryTranslate;
