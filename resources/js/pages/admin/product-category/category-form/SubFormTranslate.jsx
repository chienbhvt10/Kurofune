import React from "react";
import { Col, Form, Input, Row } from "antd";
import InputField from "../../../../commons/Form/InputField.jsx";

const SubFormCategoryTranslate = ({ lang, className, form, response }) => {
  return (
    <>
      <Row justify="center">
        <Form
          className={className}
          name="common-translate-category-form"
          form={form}
        >
          <Col span={24} className="form-group-col">
            <InputField
              field="name"
              label={`(${lang}) Name`}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Row justify="center">
            <Col span={24} className="form-group-col">
              <InputField
                field="locale"
                label={`(${lang}) Locale`}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
                type={<Input />}
              />
            </Col>
            <Col span={24} className="form-group-col">
              <InputField
                field="cat_id"
                label={`(${lang}) Category`}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[]}
                response={response}
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
