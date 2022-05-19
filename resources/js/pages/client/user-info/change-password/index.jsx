import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Row, Col, Input } from "antd";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import InputField from "../../../../commons/Form/InputField";
import useChangePassword from "../../../../hooks/auth/useChangePassword";
import "./style.scss";

export const ChangePassword = () => {
  const { i18n, t } = useTranslation();
  const { changePassword, resChangePassword } = useChangePassword();
  const dispatch = useDispatch();
  const [changePasswordForm] = Form.useForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    console.log(values);
    await changePassword(values);
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
              rules={[
                { required: true, message: "Please input current password" },
              ]}
              response={resChangePassword}
              type={
                <Input
                  type={!showCurrentPassword ? "password" : "text"}
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
              rules={[{ required: true, message: "Please input new password" }]}
              response={resChangePassword}
              type={
                <Input
                  type={!showPassword ? "password" : "text"}
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
              rules={[
                {
                  required: true,
                  message: "Please input password confirmation",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              response={resChangePassword}
              type={
                <Input
                  type={!showConfirmPassword ? "password" : "text"}
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
