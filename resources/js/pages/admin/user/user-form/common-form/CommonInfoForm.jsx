import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PREF } from "../../../../../commons/data";
import InputField from "../../../../../commons/Form/InputField";
import SelectField from "../../../../../commons/Form/SelectField";
import { validateUser } from "../../../../../helper/validateField";

const CommonInfoForm = ({ className, form }) => {
  const { t } = useTranslation();
  const resCreateUser = useSelector((state) => state.userState.resCreateUser);

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
            errorField="postal_code"
            label={t("admins.user.form.field_postal_code")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            rules={renderErrorTranslate("postal_code")}
            response={resCreateUser}
            type={<Input />}
          />
        </Col>
        <Col span={12}>
          <SelectField
            field="prefecture"
            errorField="prefecture"
            label={t("admins.user.form.field_prefecture")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            response={resCreateUser}
            placeholder={t("admins.user.form.placeholder.select_prefecture")}
            options={PREF}
          />
        </Col>
        <Col span={12}>
          <InputField
            field="city"
            errorField="city"
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
            errorField="street_address"
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
            errorField="building"
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
