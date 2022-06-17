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
              field="name"
              error="name"
              label={t("admins.user.form.vendor_profile.field_name")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="permit_classification"
              error="permit_classification"
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
              field="founder"
              error="founder"
              label={t("admins.user.form.vendor_profile.field_founder")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="items_stated_permit"
              error="items_stated_permit"
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
              field="management_pharmacist"
              error="management_pharmacist"
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
              field="registered_seller_working"
              error="registered_seller_working"
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
              field="drugs_handled"
              error="drugs_handled"
              label={t("admins.user.form.vendor_profile.field_drug_handled")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="distinguishing_by_name"
              error="distinguishing_by_name"
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
              field="business_hours"
              error="business_hours"
              label={t("admins.user.form.vendor_profile.field_business_hours")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="consultation_hours"
              error="consultation_hours"
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
              field="contact_information"
              error="contact_information"
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
              field="currently_working"
              error="currently_working"
              label={t("admins.user.form.vendor_profile.field_current_working")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="open_sale_time"
              error="open_sale_time"
              label={t("admins.user.form.vendor_profile.field_open_sale_time")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 22 }}
              response={resCreateUser}
              type={<Input.TextArea />}
            />
          </Col>
          <Col span={12}>
            <InputField
              field="time_order_outside"
              error="time_order_outside"
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
              field="expiration_date_of_drugs"
              error="expiration_date_of_drugs"
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
              field="pharmacist_working"
              error="pharmacist_working"
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
