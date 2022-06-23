import { Col, Form, Input, Row } from "antd";
import { isNull } from "lodash";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../../../commons/Form/InputField.jsx";
import { getProductFormLayout } from "./productInitValues.js";

const SubFormTranslate = ({
  lang,
  className,
  form,
  response,
  errorField,
  isFormSubmitted,
}) => {
  const formItemLayout = getProductFormLayout();
  const { t } = useTranslation();
  React.useEffect(() => {
    if (isFormSubmitted) {
      try {
        const validateForm = async () => {
          await form?.validateFields();
        };
        validateForm();
      } catch (error) {
        console.log("validate failed", error);
      }
    }
  }, []);
  return (
    <Row justify="center">
      <Form
        {...formItemLayout}
        className={className}
        name={`${lang}-common-translate-form`}
        form={form}
      >
        <Row justify="center">
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_name`}
              error={`${lang}_name`}
              label={`(${lang}) ${t("admins.product.name_field")}`}
              rules={[
                {
                  required: true,
                  message: t(
                    "admins.product.error_message.error_en_product_name"
                  ),
                  whitespace: true,
                },
              ]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_medicinal_efficacy_classification`}
              error={`${lang}_medicinal_efficacy_classification`}
              label={`(${lang}) ${t(
                "admins.product.medicinal_efficacy_classification_field"
              )}`}
              response={response}
              rows={4}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_features`}
              error={`${lang}_features`}
              label={`(${lang}) ${t("admins.product.features_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_precautions`}
              error={`${lang}_precautions`}
              label={`(${lang}) ${t("admins.product.precautions_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_efficacy_effect`}
              error={`${lang}_efficacy_effect`}
              label={`(${lang}) ${t("admins.product.efficacy_effect_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_usage_dose`}
              error={`${lang}_usage_dose`}
              label={`(${lang}) ${t("admins.product.usage_does_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_active_ingredients`}
              error={`${lang}_active_ingredients`}
              label={`(${lang}) ${t(
                "admins.product.active_ingredients_field"
              )}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_additives`}
              error={`${lang}_additives`}
              label={`(${lang}) ${t("admins.product.additives_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_precautions_storage_handling`}
              error={`${lang}_precautions_storage_handling`}
              label={`(${lang}) ${t(
                "admins.product.precautions_storage_handling_field"
              )}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field={`${lang}_manufacturer`}
              error={`${lang}_manufacturer`}
              label={`(${lang}) ${t("admins.product.manufacturer_field")}`}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default SubFormTranslate;
