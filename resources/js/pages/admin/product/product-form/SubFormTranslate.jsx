import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../../../commons/Form/InputField.jsx";
import { LANG_ENGLISH } from "../../../../constants/index.js";
import { getProductFormLayout } from "./productInitValues.js";

const SubFormTranslate = ({ lang, className, form, response }) => {
  const formItemLayout = getProductFormLayout();
  const { i18n, t } = useTranslation();
  return (
    <Row justify="center">
      <Form
        {...formItemLayout}
        className={className}
        name="common-translate-form"
        form={form}
      >
        <Row justify="center">
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="name"
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
              errorField="en.name"
              type={<Input.TextArea />}
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="medicinal_efficacy_classification"
              label={`(${lang}) ${t(
                "admins.product.medicinal_efficacy_classification_field"
              )}`}
              rules={[]}
              response={response}
              rows={4}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="features"
              label={`(${lang}) ${t("admins.product.features_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="precautions"
              label={`(${lang}) ${t("admins.product.precautions_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="efficacy_effect"
              label={`(${lang}) ${t("admins.product.efficacy_effect_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="usage_dose"
              label={`(${lang}) ${t("admins.product.usage_does_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="active_ingredients"
              label={`(${lang}) ${t(
                "admins.product.active_ingredients_field"
              )}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="additives"
              label={`(${lang}) ${t("admins.product.additives_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="precautions_storage_handling"
              label={`(${lang}) ${t(
                "admins.product.precautions_storage_handling_field"
              )}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="manufacturer"
              label={`(${lang}) ${t("admins.product.manufacturer_field")}`}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>

          {/*  <Col lg={12} md={12} sm={24} xs={24} className="form-group-col">
            <InputField
              field="use_manual"
              label={`(${lang}) ${t("admins.product.use_manual_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col> */}
        </Row>
      </Form>
    </Row>
  );
};

export default SubFormTranslate;
