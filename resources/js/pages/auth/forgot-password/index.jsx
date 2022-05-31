import { Col, Form, Input, Row, Typography, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import useForgotPassword from "../../../hooks/auth/useForgotPassword";
import { useTranslation } from "react-i18next";
import "./forgot-password.scss";
import { getCurrentLanguage } from "../../../helper/localStorage";

const { Title } = Typography;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();
  const navigate = useNavigate();
  const { resForgotPassword, getForgotPassword, resetResponse } =
    useForgotPassword();
  const [form] = Form.useForm();

  const forgotEmailInitValues = {
    email: "",
  };

  const backLogin = async () => {
    await resetResponse();
  };

  useEffect(() => {
    if (!resForgotPassword || resForgotPassword?.status_code !== 200) {
      return;
    } else {
      navigate(`${lang}/reset-link-password`);
      backLogin();
    }
  }, [resForgotPassword]);

  const onResetRequest = async (values) => {
    await getForgotPassword(values.email);
  };

  return (
    <Row justify="center">
      <Col span={16}>
        <Title className="title" level={5}>
          パスワードをお忘れの方は、以下に登録時のメールアドレスを
          <br />
          入力して「メール送信」ボタンを押してください。
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
                className="w-100"
                size="large"
                type="primary"
                htmlType="submit"
              >
                メール送信
              </Button>
            </Col>
            <Col span={24}>
              <Row justify="center">
                <Link
                  className="btn btn-back"
                  to={`${lang}/login`}
                  onClick={backLogin}
                >
                  BACK
                </Link>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default ForgotPassword;
