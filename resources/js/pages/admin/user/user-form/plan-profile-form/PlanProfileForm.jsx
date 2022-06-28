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

  // const isCheckRoleFullAndLight = React.useMemo(()=>{
  //   if(role ===ROLE_FULL_SUPPORT_PLAN || role === ROLE_LIGHT_PLAN) {
  //     userInfoForm.setFieldsValue({
  //       active : 0
  //     })
  //     return true
  //   }
  //   return false
  // },[role])
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
          {/* <Col span={12}>
            <InputField
              field="address"
              error="address"
              label={t("admins.user.form.profile.field_address")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col> */}
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
              label={t("admins.user.form.profile.field_company_name")}
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
              label={t("admins.user.form.profile.field_company_mail")}
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
              label={t("admins.user.form.profile.field_person_in_charge")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              rules={renderErrorTranslate("person_in_charge")}
              response={resCreateUser}
              type={<Input />}
            />
          </Col>
         
          {/* <Col span={12}>
            <InputField
              field="inflow_source"
              error="inflow_source"
              label={t("admins.user.form.profile.field_payment_source")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col> */}
          {/* <Col span={12}>
            <SelectField
              field="payment"
              error="payment"
              label={t("admins.user.form.profile.field_payment")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              disabled={true}
              placeholder={t("admins.user.form.placeholder.select_payment")}
              options={userFormOptions.payment}
            />
          </Col> */}
          {/* <Col span={12}>
            <SelectField
              field="insurance_status"
              error="insurance_status"
              label={t("admins.user.form.profile.field_insurance_status")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              placeholder={t(
                "admins.user.form.placeholder.select_insurance_status"
              )}
              options={userFormOptions.insurance_status}
            />
          </Col> */}
          {/* <Col span={12}>
            <SelectField
              field="insurance_support"
              error="insurance_support"
              label={t("admins.user.form.profile.field_insurance_support")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
              options={userFormOptions.insurance_support}
              disabled={true}
            />
          </Col> */}
          {/* {role === "full support plan" && (
            <Col span={12}>
              <InputField
                field="insurance_start_date"
                error="insurance_start_date"
                label={t("admins.user.form.profile.field_insurance_start_date")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 22 }}
                response={resCreateUser}
                type={<Input />}
              />
            </Col>
          )} */}
          {/* <Col span={12}>
            <SelectField
              field="overseas_remittance_status"
              error="overseas_remittance_status"
              label={t(
                "admins.user.form.profile.field_overseas_remittance_status"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              options={userFormOptions.overseas_remittance_status}
              disabled={true}
            />
          </Col> */}
          {/* <Col span={12}>
            <InputField
              field="orientation"
              error="orientation"
              label={t("admins.user.form.profile.field_orientation")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input />}
            />
          </Col> */}
          {/* {role === ROLE_FULL_SUPPORT_PLAN && (
            <>
              <Col span={12}>
                <DateField
                  field="start_date_education"
                  error="start_date_education"
                  label={t(
                    "admins.user.form.profile.field_start_date_education"
                  )}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  locale={{ lang: { locale: "vi_VN" } }}
                  response={resCreateUser}
                  disabledDate={(current) => {
                    if (endDate) {
                      return current && current.valueOf() > endDate;
                    }
                  }}
                  onChange={(v) => setStartDate(v)}
                />
              </Col>
              <Col span={12}>
                <DateField
                  field="end_date_education"
                  error="end_date_education"
                  label={t("admins.user.form.profile.field_end_date_education")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 22 }}
                  locale={{ lang: { locale: "vi_VN" } }}
                  response={resCreateUser}
                  disabledDate={(current) => {
                    return current && current.valueOf() < startDate;
                  }}
                  onChange={(v) => setEndDate(v)}
                />
              </Col>
            </>
          )} */}


          {/* <Col span={12}>
            <SelectField
              field="wabisabi_my_page_registration"
              error="wabisabi_my_page_registration"
              label={t("admins.user.form.profile.field_page_registration")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              options={userFormOptions.wabisabi_my_page_registration}
              disabled={true}
            />
          </Col> */}
          
          
          <Col span={12}>
            <InputField
              field="person_in_charge_contact_information"
              error="person_in_charge_contact_information"
              label={t("admins.user.form.profile.field_person_contact_information")}
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
