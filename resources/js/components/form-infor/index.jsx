import { Button, Col, Form, Input, Row } from "antd";
import postal_code from "japan-postal-code";
import React from "react";
import { useTranslation } from "react-i18next";
import { PREF } from "../../commons/data";
import InputField from "../../commons/Form/InputField";
import SelectField from "../../commons/Form/SelectField";
import {
  getBillingInitValues,
  getProfileInitValues,
  getShippingInitValues,
} from "./initValues.js";
import "./style.scss";

export const FormInfor = ({ onSave, item, typeForm, response }) => {
  const [formInfo] = Form.useForm();
  const { i18n, t } = useTranslation();

  const billingInitValues = getBillingInitValues(item);
  const shippingInitValues = getShippingInitValues(item);
  const profileInitValues = getProfileInitValues(item);

  React.useEffect(() => {
    if (typeForm === "billing") {
      formInfo.setFieldsValue(billingInitValues);
    } else if (typeForm === "shipping") {
      formInfo.setFieldsValue(shippingInitValues);
    } else if (typeForm === "profile") {
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
            field={typeForm === "profile" ? "name" : "full_name"}
            errorField={typeForm === "profile" ? "name" : "full_name"}
            label={t("member.change_profile.field_full_name")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input full name" }]}
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
                rules={[
                  { required: true, message: "Please input postal code" },
                  { max: 3, message: "Input only 3 number" },
                ]}
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
                rules={[{ max: 4, message: "Input only 4 number" }]}
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
            errorField="prefecture"
            label={t("member.change_profile.field_prefecture")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please select prefecture" }]}
            response={response}
            placeholder="Please select prefecture"
            options={PREF}
          />
        </Col>

        <Col span={24}>
          <InputField
            field="city"
            errorField="city"
            label={t("member.change_profile.field_city")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input city" }]}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="street_address"
            errorField="street_address"
            label={t("member.change_profile.field_street")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input street address" }]}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="building"
            errorField="building"
            label={t("member.change_profile.field_building")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[]}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="phone"
            errorField="phone"
            label={t("member.change_profile.field_phone")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input phone" }]}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <InputField
            field="email"
            errorField="email"
            label={t("member.change_profile.field_email")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input email" },
              { type: "email", message: "Please input valid email" },
            ]}
            response={response}
            type={<Input className="input-field" />}
          />
        </Col>
        <Col span={24}>
          <Row justify="end">
            <Button className="btn-save" htmlType="submit">
              {t("member.user_profile.btn_save")}
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
