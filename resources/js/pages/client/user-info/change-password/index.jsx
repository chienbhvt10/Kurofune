import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InputField from "../../../../commons/Form/InputField";
import { getCurrentLanguage } from "../../../../helper/localStorage";
import { validateUser } from "../../../../helper/validateField";
import useChangePassword from "../../../../hooks/auth/useChangePassword";
import useLogout from "../../../../hooks/auth/useLogout";
import "./style.scss";

export const ChangePassword = () => {
  const { i18n, t } = useTranslation();
  const { changePassword, resChangePassword } = useChangePassword();
  const { getLogout, resLogout } = useLogout();
  const [changePasswordForm] = Form.useForm();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const lang = getCurrentLanguage();

  const changePasswordInitValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  React.useEffect(() => {
    if (resChangePassword?.status_code === 200) {
      changePasswordForm.setFieldsValue(changePasswordInitValues);
    }
  }, [resChangePassword]);

  const onFinish = async (values) => {
    await changePassword(values);
    await getLogout();
  };

  React.useEffect(() => {
    if (resLogout?.status_code === 200) {
      navigate(`${lang}/login`);
    }
  }, [resLogout]);

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
            <Button className="btn-save" htmlType="submit">
              {t("member.user_profile.btn_save")}
            </Button>
          </Row>
        </Col>
      </Form>
    </>
  );
};
