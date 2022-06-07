import React from "react";
import { Col, Form, Input, Row } from "antd";
import InputField from "../../../../commons/Form/InputField.jsx";
import { getCategoryFormLayout } from "./categoryInitValues.js";

const SubFormCategoryTranslate = ({ lang, className, form, response }) => {
  const formItemLayout = getCategoryFormLayout();
  return (
    <>
      <Row justify="center">
        <Form
          {...formItemLayout}
          className={className}
          name="common-translate-category-form"
          form={form}
        >
          <Col span={24} className="form-group-col">
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
          <Row justify="center">
            <Col span={24} className="form-group-col">
              <InputField
                field="locale"
                label={`(${lang}) Locale`}
                rules={[]}
                type={<Input />}
              />
            </Col>
            <Col span={24} className="form-group-col">
              <InputField
                field="cat_id"
                label={`(${lang}) Category`}
                rules={[]}
                type={<Input />}
              />
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default SubFormCategoryTranslate;
