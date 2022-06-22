import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PREF } from "../../../../../commons/data";
import InputField from "../../../../../commons/Form/InputField";
import SelectField from "../../../../../commons/Form/SelectField";
import { TYPE_FORM_CREATE } from "../../../../../constants";
import { validateUser } from "../../../../../helper/validateField";

const CommonInfoForm = ({ className, form, typeForm }) => {
  const { t } = useTranslation();
  const { resCreateUser, resUpdateUser } = useSelector(
    (state) => state.userState
  );

  const renderErrorTranslate = (field) => {
    return validateUser?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <Form
      className={className}
      name="common-address-form"
      form={form}
      autoComplete="off"
    >
      <Row justify="center">
        <Col span={12}>
          <InputField
            field="postal_code"
            error="postal_code"
            label={t("admins.user.form.field_postal_code")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("postal_code")}
            response={
              typeForm === TYPE_FORM_CREATE ? resCreateUser : resUpdateUser
            }
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <SelectField
            field="prefecture"
            error="prefecture"
            label={t("admins.user.form.field_prefecture")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={resCreateUser}
            placeholder={t("admins.user.form.placeholder.select_prefecture")}
            options={PREF}
            dependId="prefecture"
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            error="city"
            label={t("admins.user.form.field_city")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="street_address"
            error="street_address"
            label={t("admins.user.form.field_street")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="building"
            error="building"
            label={t("admins.user.form.field_building")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 23 }}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default CommonInfoForm;
