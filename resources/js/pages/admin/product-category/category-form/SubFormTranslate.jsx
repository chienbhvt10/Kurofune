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
        <Row justify="center" className="input-field-space">
          <Col span={24}>
            <InputField
              field="name"
              label={`(${lang}) ${t("admins.category.name_field")}`}
              rules={[
                lang === "EN" && {
                  required: true,
                  message: t("admins.category.error_message.error_name"),
                  whitespace: true,
                },
              ]}
              response={response}
              errorField="en.name"
              type={<Input />}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SubFormCategoryTranslate;
