import { Button, Col, Form, Input, Row } from "antd";
import postal_code from "japan-postal-code";
import React from "react";
import { useTranslation } from "react-i18next";
import { PREF } from "../../commons/data";
import InputField from "../../commons/Form/InputField";
import SelectField from "../../commons/Form/SelectField";
import {
  BILLING_INFO_FORM,
  FIELD_USER_FULL_NAME,
  FIELD_USER_NAME,
  PROFILE_FORM,
  SHIPPING_INFO_FORM,
} from "../../constants";
import { validateUser } from "../../helper/validateField";
import {
  getBillingInitValues,
  getProfileInitValues,
  getShippingInitValues,
} from "./initValues.js";
import "./style.scss";

export const FormInfo = ({ onSave, item, typeForm, response, loading }) => {
  const [formInfo] = Form.useForm();
  const { i18n, t } = useTranslation();

  const billingInitValues = getBillingInitValues(item);
  const shippingInitValues = getShippingInitValues(item);
  const profileInitValues = getProfileInitValues(item);

  React.useEffect(() => {
    if (typeForm === BILLING_INFO_FORM) {
      formInfo.setFieldsValue(billingInitValues);
    } else if (typeForm === SHIPPING_INFO_FORM) {
      formInfo.setFieldsValue(shippingInitValues);
    } else if (typeForm === PROFILE_FORM) {
      formInfo.setFieldsValue(profileInitValues);
    }
  }, [item]);

  const onCodeJapan = () => {
    if (
      formInfo.getFieldValue("to_code") &&
      formInfo.getFieldValue("from_code")
    ) {
      const code =
        +formInfo.getFieldValue("from_code") +
        formInfo.getFieldValue("to_code");
      postal_code.get(code, (address) => {
        if (address.prefecture || address.city || address.area) {
          formInfo.setFieldsValue({
            ...formInfo.getFieldsValue(),
            prefecture: address.prefecture,
            city: address.city,
            street_address: address.area,
          });
        }
      });
    }
  };

  const onFinish = () => {
    onSave({
      ...formInfo.getFieldsValue(),
      postal_code:
        formInfo.getFieldValue("from_code") + formInfo.getFieldValue("to_code"),
    });
  };

  const renderErrorTranslate = (field) => {
    return validateUser?.form_info?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <Form
      id="form-infor"
      form={formInfo}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row justify="center">
        <Col span={24}>
          <InputField
            field={
              typeForm === PROFILE_FORM ? FIELD_USER_NAME : FIELD_USER_FULL_NAME
            }
            error={
              typeForm === PROFILE_FORM ? FIELD_USER_NAME : FIELD_USER_FULL_NAME
            }
            label={t("member.change_profile.field_full_name")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("full_name")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <Row align="middle">
            <Col span={8}>
              <InputField
                field="from_code"
                label={t("member.change_profile.field_postal")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={renderErrorTranslate("from_postcode")}
                response={response}
                type={<Input className="input-field" />}
              />
            </Col>
            <span style={{ margin: "15px 5px 0 5px", fontSize: 26 }}>-</span>
            <Col span={8}>
              <InputField
                field="to_code"
                label=" "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={renderErrorTranslate("to_postcode")}
                response={response}
                type={<Input className="input-field" />}
              />
            </Col>
            <Col span={5}>
              <Button
                type="button"
                className="btn-search"
                onClick={onCodeJapan}
              >
                {t("member.change_profile.btn_search")}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <SelectField
            field="prefecture"
            error="prefecture"
            label={t("member.change_profile.field_prefecture")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("prefecture")}
            response={response}
            placeholder="Please select prefecture"
            options={PREF}
          />
        </Col>

        <Col span={24}>
          <InputField
            field="city"
            error="city"
            label={t("member.change_profile.field_city")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("city")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="street_address"
            error="street_address"
            label={t("member.change_profile.field_street")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("street_address")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="building"
            error="building"
            label={t("member.change_profile.field_building")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="phone"
            error="phone"
            label={t("member.change_profile.field_phone")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("phone")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="email"
            error="email"
            label={t("member.change_profile.field_email")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={renderErrorTranslate("email")}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <Row justify="end">
            <Button loading={loading} className="btn-save" htmlType="submit">
              {t("member.user_profile.btn_save")}
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
