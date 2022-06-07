import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import InputField from "../../../../commons/Form/InputField";
import { validateUser } from "../../../../helper/validateField";
import useChangePassword from "../../../../hooks/auth/useChangePassword";
import "./style.scss";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { changePassword, resChangePassword, loadingChangePassword } =
    useChangePassword();
  const [changePasswordForm] = Form.useForm();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const onFinish = (values) => {
    changePassword(values);
  };

  const renderErrorTranslate = (field) => {
    return validateUser?.change_password?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {t("member.change_password.title")}</title>
        <meta name="description" content="Change Password Page" />
        <meta name="og:title" content="Change Password" />
      </Helmet>
      <Form
        className="change-password-form"
        form={changePasswordForm}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row justify="center">
          <Col span={24}>
            <InputField
              field="current_password"
              label={t("member.change_password.field_old_password")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={renderErrorTranslate("current_password")}
              response={resChangePassword}
              type={
                <Input
                  type={!showCurrentPassword ? "password" : "text"}
                  className="input-field"
                  addonAfter={
                    <FontAwesomeIcon
                      icon={!showCurrentPassword ? faEyeSlash : faEye}
                      color="#515151"
                      size="sm"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  }
                />
              }
            />
          </Col>
          <Col span={24}>
            <InputField
              field="password"
              label={t("member.change_password.field_new_password")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={renderErrorTranslate("password")}
              response={resChangePassword}
              type={
                <Input
                  type={!showPassword ? "password" : "text"}
                  className="input-field"
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
              label={t("member.change_password.field_confirm_password")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              dependencies={["password"]}
              rules={renderErrorTranslate("password_confirmation")}
              response={resChangePassword}
              type={
                <Input
                  type={!showConfirmPassword ? "password" : "text"}
                  className="input-field"
                  addonAfter={
                    <FontAwesomeIcon
                      icon={!showConfirmPassword ? faEyeSlash : faEye}
                      color="#515151"
                      size="sm"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                />
              }
            />
          </Col>
        </Row>
        <Col span={24}>
          <Row justify="end">
            <Button
              loading={loadingChangePassword}
              className="btn-save"
              htmlType="submit"
            >
              {t("member.user_profile.btn_save")}
            </Button>
          </Row>
        </Col>
      </Form>
    </>
  );
};
