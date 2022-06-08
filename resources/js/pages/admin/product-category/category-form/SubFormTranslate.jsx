import React from "react";
import { Col, Form, Input, Row } from "antd";
import InputField from "../../../../commons/Form/InputField.jsx";
import { getCategoryFormLayout } from "./categoryInitValues.js";

const SubFormCategoryTranslate = ({ lang, className, form, response }) => {
  const formItemLayout = getCategoryFormLayout();
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
              label={`(${lang}) Name`}
              rules={[
                lang === "EN" && {
                  required: true,
                  message: "Please enter your Name",
                  whitespace: true,
                },
              ]}
              response={response}
              errorField="en.name"
              type={<Input />}
            />
          </Col>

          <Col span={24}>
            <InputField
              field="locale"
              label={`(${lang}) Locale`}
              rules={[]}
              type={<Input />}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SubFormCategoryTranslate;
