import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../../../commons/Form/InputField.jsx";
import { validateProductForm } from "../../../../helper/validateField.js";

const SubFormTranslate = ({ lang, className, form, response }) => {
  const { i18n, t } = useTranslation();
  return (
    <Row justify="center">
      <Form className={className} name="common-translate-form" form={form}>
        <Row justify="center">
          <Col span={12} className="form-group-col">
            <InputField
              field="name"
              label={`(${lang}) ${t("admins.product.name_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              // rules={validateProductForm.en_name}
              rules={[{
                required: true,
                message: t("admins.product.error_message.required_message"),
                whitespace: true
              }]}
              type={<Input.TextArea />}
            />
          </Col>

          <Col span={12} className="form-group-col">
            <InputField
              field="medicinal_efficacy_classification"
              label={`(${lang}) ${t("admins.product.medicinal_efficacy_classification_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              rows={4}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="features"
              label={`(${lang}) ${t("admins.product.features_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="precautions"
              label={`(${lang}) ${t("admins.product.precautions_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="efficacy_effect"
              label={`(${lang}) ${t("admins.product.efficacy_effect_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="usage_dose"
              label={`(${lang}) ${t("admins.product.usage_does_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="active_ingredients"
              label={`(${lang}) ${t("admins.product.active_ingredients_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="additives"
              label={`(${lang}) ${t("admins.product.additives_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="precautions_storage_handling"
              label={`(${lang}) ${t("admins.product.precautions_storage_handling_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12} className="form-group-col">
            <InputField
              field="manufacturer"
              label={`(${lang}) ${t("admins.product.manufacturer_field")}`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>

          {/* <Col span={12} className="form-group-col">
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
