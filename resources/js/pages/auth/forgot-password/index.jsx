import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../commons/Notification";
import PageHead from "../../../commons/PageHead";
import { getCurrentLanguage } from "../../../helper/localStorage";
import { validateAuth } from "../../../helper/validateField";
import useForgotPassword from "../../../hooks/auth/useForgotPassword";
import { resetAuthResponse } from "../../../redux/actions/authAction";
import "./forgot-password.scss";

const { Title } = Typography;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const { resForgotPassword, getForgotPassword, loadingForgotPassword } =
    useForgotPassword();
  const [form] = Form.useForm();

  const forgotEmailInitValues = {
    email: "",
  };

  const onResetRequest = (values) => {
    getForgotPassword(values.email);
  };

  const renderErrorTranslate = (field) => {
    return validateAuth?.forgot_password?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <>
      <PageHead
        title={t("meta.title_forgot_password")}
        content={t("meta.content_forgot_password")}
      />
      <Row justify="center">
        <Col span={16}>
          <Title className="title" level={5}>
            {t("forgot_password.title1")}
            <br />
            {t("forgot_password.title2")}
          </Title>
          <Form
            form={form}
            className="forgot-password-form"
            onFinish={onResetRequest}
            initialValues={forgotEmailInitValues}
          >
            <Row justify="center">
              <Col span={24}>
                <InputField
                  field="email"
                  label="Email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  response={resForgotPassword}
                  rules={renderErrorTranslate("email")}
                  type={
                    <Input
                      className="input-field"
                      addonBefore={
                        <img
                          className="icon-input"
                          src="/images/ic-user.png"
                          alt=""
                        />
                      }
                    />
                  }
                />
              </Col>
              <Col span={8}>
                <Button
                  loading={loadingForgotPassword}
                  className="w-100"
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  {t("btn_send_mail")}
                </Button>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  <Link className="btn btn-back" to={`${lang}/login`}>
                    {t("btn_back")}
                  </Link>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ForgotPassword;
