import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import InputField from "../../../../../commons/Form/InputField";

const SubFormUserTranslate = ({ lang, className, form }) => {
  const response = useSelector((state) => state.userState.response);
  return (
    <Row justify="center">
      <Form className={className} name="common-address-form" form={form}>
        <Row justify="center">
          <Col span={12}>
            <InputField
              field="locale"
              label="Locale"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="name"
              label="Name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="permit_classification"
              label="Permit classification"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="founder"
              label="Founder"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="items_stated_permit"
              label="Items to be stated in the permit"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="management_pharmacist"
              label="Management pharmacist"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="registered_seller_working"
              label="Registered Seller Working"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="drugs_handled"
              label="Drugs Handled"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="distinguishing_by_name"
              label="Distinguishing by name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="business_hours"
              label="Business Hours"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="consultation_hours"
              label="Consultation Hours"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="contact_information"
              label="Contact Information"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="currently_working"
              label="Currently Working"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="open_sale_time"
              label="Open Sale Time"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="time_order_outside"
              label="Time Order Outside"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="expiration_date_of_drugs"
              label="Expiration Date Of Drug"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input.TextArea />}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default SubFormUserTranslate;
