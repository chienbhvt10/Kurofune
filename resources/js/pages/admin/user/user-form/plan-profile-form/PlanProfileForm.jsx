import { Col, Form, Input, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { userFormOptions } from "../../../../../commons/data";
import DateField from "../../../../../commons/Form/DateField";
import InputField from "../../../../../commons/Form/InputField";
import SelectField from "../../../../../commons/Form/SelectField";
import {
  ROLE_FULL_SUPPORT_PLAN,
  ROLE_LIGHT_PLAN,
} from "../../../../../constants/index.js";
import { validateUser } from "../../../../../helper/validateField";
const PlanProfileForm = ({ form, className, role }) => {
  const { t } = useTranslation();
  const resCreateUser = useSelector((state) => state.userState.resCreateUser);

  React.useEffect(() => {
    if (role === ROLE_FULL_SUPPORT_PLAN) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        insurance_support: 1,
        overseas_remittance_status: 1,
        wabisabi_my_page_registration: 1,
        payment: 1,
      });
    }
    if (role === ROLE_LIGHT_PLAN) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        payment: 0,
        insurance_support: 0,
        overseas_remittance_status: 0,
        wabisabi_my_page_registration: 0,
      });
    }
  }, [role]);
  const renderErrorTranslate = (field) => {
    return validateUser?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  return (
    <div className={`common-profile-form ${className}`}>
      <Form name="plan-profile-form" form={form}>
        <Row>
          <Col span={12}>
            <DateField
              field="dob"
              error="dob"
              label={t("admins.user.form.profile.field_dob")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              locale={{ lang: { locale: "vi_VN" } }}
              response={resCreateUser}
              disabledDate={disabledDate}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="gender"
              error="gender"
              label={t("admins.user.form.profile.field_gender")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              placeholder={t("admins.user.form.placeholder.select_gender")}
              options={userFormOptions.gender}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="facebook"
              error="facebook"
              label={t("admins.user.form.profile.field_facebook")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="line"
              error="line"
              label={t("admins.user.form.profile.field_line")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="nationality"
              error="nationality"
              label={t("admins.user.form.profile.field_nationality")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="visa_type"
              error="visa_type"
              label={t("admins.user.form.profile.field_visa_type")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              placeholder={t(
                "admins.user.form.placeholder.select_education_status"
              )}
              options={userFormOptions.VISA_TYPE}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="job_name"
              error="job_name"
              label={t("admins.user.form.profile.field_job_name")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              placeholder={t(
                "admins.user.form.placeholder.select_education_status"
              )}
              options={userFormOptions.JOB}
            />
          </Col>
          <Col span={12}>
            <SelectField
              field="education_status"
              error="education_status"
              label={t("admins.user.form.profile.field_education_status")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              placeholder={t(
                "admins.user.form.placeholder.select_education_status"
              )}
              options={userFormOptions.education_status}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="company_name"
              error="company_name"
              label="Company name"
              // label={t("admins.user.form.profile.field_company_name")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={renderErrorTranslate("company_name")}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="company_email"
              error="company_email"
              label="Company email"
              // label={t("admins.user.form.profile.field_company_mail")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={renderErrorTranslate("company_email")}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="person_in_charge"
              error="person_in_charge"
              label="Person in charge"
              // label={t("admins.user.form.profile.field_person_in_charge")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={renderErrorTranslate("person_in_charge")}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>

          <Col span={12}>
            <InputField
              field="person_in_charge_contact_information"
              error="person_in_charge_contact_information"
              label="Person in charge contact information"
              // label={t("admins.user.form.profile.field_person_contact_information")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              rules={renderErrorTranslate("person_in_charge_contact_information")}
              type={<Input />}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PlanProfileForm;
