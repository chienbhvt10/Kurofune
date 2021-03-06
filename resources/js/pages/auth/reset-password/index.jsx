import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import PageHead from "../../../commons/PageHead";
import { getResetMail } from "../../../helper/localStorage";
import { validateAuth } from "../../../helper/validateField";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import "./reset-password.scss";

const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(true);
  const { resResetPassword, getResetPassword, loadingResetPassword } =
    useResetPassword();
  const resetEmail = getResetMail();
  const [form] = Form.useForm();

  const resetPasswordInitValues = {
    token: param.get("token"),
    email: resetEmail,
    password: "",
    password_confirmation: "",
  };

  React.useEffect(() => {
    form.setFieldsValue(resetPasswordInitValues);
  }, [param]);

  const onResetPassword = (values) => {
    getResetPassword(values);
  };

  const renderErrorTranslate = (field) => {
    const errorMessage = validateAuth?.reset_password?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
    if (field === "password_confirmation") {
      return [
        ...errorMessage,
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(t("admins.user.error.not_same_password"))
            );
          },
        }),
      ];
    }
    return errorMessage;
  };

  return (
    <>
      <PageHead
        title={t("meta.title_reset_password")}
        content={t("meta.content_reset_password")}
      />
      <Row justify="center">
        <Col span={12}>
          <Form
            initialValues={resetPasswordInitValues}
            name="reset-password-form"
            onFinish={onResetPassword}
            autoComplete="off"
          >
            <Row justify="center" align="middle">
              <Col span={24}>
                <InputField
                  field="email"
                  label="Email"
                  error="email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  response={resResetPassword}
                  rules={renderErrorTranslate("email")}
                  type={
                    <Input
                      addonBefore={
                        <img
                          className="icon-input"
                          src="/images/ic-user.png"
                          alt=""
                        />
                      }
                      className="input-field"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <InputField
                  field="password"
                  label="Password"
                  error="password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={renderErrorTranslate("password")}
                  response={resResetPassword}
                  type={
                    <Input
                      type={!showPassword ? "password" : "text"}
                      addonBefore={
                        <img
                          className="icon-input"
                          src="/images/ic-key.png"
                          alt=""
                        />
                      }
                      addonAfter={
                        <FontAwesomeIcon
                          icon={!showPassword ? faEyeSlash : faEye}
                          color="#515151"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      }
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <InputField
                  field="password_confirmation"
                  label="Password confirmation"
                  error="password_confirmation"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  dependencies={["password"]}
                  rules={renderErrorTranslate("password_confirmation")}
                  response={resResetPassword}
                  type={
                    <Input
                      type={!showPasswordConfirm ? "password" : "text"}
                      className="input-field"
                      addonBefore={
                        <img
                          className="icon-input"
                          src="/images/ic-key.png"
                          alt=""
                        />
                      }
                      addonAfter={
                        <FontAwesomeIcon
                          icon={!showPasswordConfirm ? faEyeSlash : faEye}
                          color="#515151"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                        />
                      }
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <InputField
                  field="token"
                  label=""
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  response={resResetPassword}
                  type={<Input hidden />}
                />
              </Col>
              <Col span={12}>
                <Button
                  loading={loadingResetPassword}
                  type="primary"
                  className="w-100"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
