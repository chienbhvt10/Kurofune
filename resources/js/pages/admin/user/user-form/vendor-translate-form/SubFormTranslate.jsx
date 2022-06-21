import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InputField from "../../../../../commons/Form/InputField";

const SubFormUserTranslate = ({ lang, className, form }) => {
  const { t } = useTranslation();

  const resCreateUser = useSelector((state) => state.userState.resCreateUser);

  React.useEffect(() => {
    form.setFieldsValue({ ...form.getFieldsValue(), locale: lang });
  }, [lang]);

  return (
    <Row justify="center">
      <Form className={className} name="common-address-form" form={form}>
        <Row justify="center">
          <Col span={12}>
            <InputField
              field={`${lang}_name`}
              error={`${lang}_name`}
              label={t("admins.user.form.vendor_profile.field_name")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_permit_classification`}
              error={`${lang}_permit_classification`}
              label={t(
                "admins.user.form.vendor_profile.field_permit_classification"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_founder`}
              error={`${lang}_founder`}
              label={t("admins.user.form.vendor_profile.field_founder")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_items_stated_permit`}
              error={`${lang}_items_stated_permit`}
              label={t(
                "admins.user.form.vendor_profile.field_stated_in_permit"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_management_pharmacist`}
              error={`${lang}_management_pharmacist`}
              label={t(
                "admins.user.form.vendor_profile.field_management_pharmacist"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_registered_seller_working`}
              error={`${lang}_registered_seller_working`}
              label={t(
                "admins.user.form.vendor_profile.field_registered_seller_working"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_drugs_handled`}
              error={`${lang}_drugs_handled`}
              label={t("admins.user.form.vendor_profile.field_drug_handled")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_distinguishing_by_name`}
              error={`${lang}_distinguishing_by_name`}
              label={t(
                "admins.user.form.vendor_profile.field_distinguishing_by_name"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_business_hours`}
              error={`${lang}_business_hours`}
              label={t("admins.user.form.vendor_profile.field_business_hours")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_consultation_hours`}
              error={`${lang}_consultation_hours`}
              label={t(
                "admins.user.form.vendor_profile.field_consultation_hours"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_contact_information`}
              error={`${lang}_contact_information`}
              label={t(
                "admins.user.form.vendor_profile.field_contact_information"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_currently_working`}
              error={`${lang}_currently_working`}
              label={t("admins.user.form.vendor_profile.field_current_working")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_open_sale_time`}
              error={`${lang}_open_sale_time`}
              label={t("admins.user.form.vendor_profile.field_open_sale_time")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_time_order_outside`}
              error={`${lang}_time_order_outside`}
              label={t(
                "admins.user.form.vendor_profile.field_time_order_outside"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_expiration_date_of_drugs`}
              error={`${lang}_expiration_date_of_drugs`}
              label={t(
                "admins.user.form.vendor_profile.field_expiration_date_of_drug"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field={`${lang}_pharmacist_working`}
              error={`${lang}_pharmacist_working`}
              label={t(
                "admins.user.form.vendor_profile.field_pharmacist_working"
              )}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default SubFormUserTranslate;
