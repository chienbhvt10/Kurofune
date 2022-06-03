import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import { getCurrentLanguage, getResetMail } from "../../../helper/localStorage";
import { validateAuth } from "../../../helper/validateField";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import "./reset-password.scss";

const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(true);
  const { resResetPassword, getResetPassword } = useResetPassword();
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
    return validateAuth?.reset_password?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
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
              <Button type="primary" className="w-100" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ResetPassword;
