import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { userFormOptions } from "../../../../../commons/data";
import DateField from "../../../../../commons/Form/DateField";
import InputField from "../../../../../commons/Form/InputField";
import SelectField from "../../../../../commons/Form/SelectField";
import RenderApiErrorMessage from "../../../../../commons/RenderErrorMessage/RenderApiErrorMessage";

const PlanProfileForm = ({ form, className }) => {
  const response = useSelector((state) => state.userState.response);
  const dateFormat = "YYYY/MM/DD";

  return (
    <div className={`common-profile-form ${className}`}>
      <Form name="plan-profile-form" form={form}>
        <Row>
          <Col span={12}>
            <DateField
              field="dob"
              label="Dob"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              locale={{ lang: { locale: "vi_VN" } }}
              response={response}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="gender"
              label="Gender"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select gender"
              options={userFormOptions.gender}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="facebook"
              label="Facebook"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="line"
              label="Line"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="address"
              label="Address"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="nationality"
              label="Nationality"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="visa_type"
              label="Visa Type"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="job_name"
              label="Job Name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="company_representative"
              label="Company representative"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="inflow_source"
              label="Inflow Source"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="payment"
              label="Payment"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select payment"
              options={userFormOptions.payment}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="insurance_status"
              label="Insurance Status"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select Insurance Status"
              options={userFormOptions.insurance_status}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="insurance_support"
              label="Insurance Support"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="insurance_start_date"
              label="Insurance Start Date"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="overseas_remittance_status"
              label="Overseas Remittance Status"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select Overseas Remittance Status"
              options={userFormOptions.overseas_remittance_status}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="orientation"
              label="Orientation"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              type={<Input />}
            />
          </Col>

          <Col span={12}>
            <DateField
              field="start_date_education"
              label="Start Date Education"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              locale={{ lang: { locale: "vi_VN" } }}
              response={response}
            />
          </Col>
          <Col span={12}>
            <DateField
              field="end_date_education"
              label="End Date Education"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              locale={{ lang: { locale: "vi_VN" } }}
              response={response}
            />
          </Col>

          <Col span={12}>
            <SelectField
              field="education_status"
              label="Education Status"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select Education Status"
              options={userFormOptions.education_status}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="wabisabi_my_page_registration"
              label="Wabisabi My Page Registration"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={[]}
              response={response}
              placeholder="Please select Wabisabi My Page Registration"
              options={userFormOptions.wabisabi_my_page_registration}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PlanProfileForm;
