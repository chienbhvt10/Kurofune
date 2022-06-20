import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import InputField from "../../../../commons/Form/InputField";
import PageHead from "../../../../commons/PageHead";
import { validateUser } from "../../../../helper/validateField";
import useChangePassword from "../../../../hooks/auth/useChangePassword";
import { resetChangePasswordResponse } from "../../../../redux/actions/authAction";
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
  const [isShowValidator, setIsShowValidator] = React.useState(false);
  const onFinish = (values) => {
    changePassword(values);
  };

  const renderErrorTranslate = (field) => {
    const errorMessage = validateUser?.change_password?.[field].map((item) => {
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
  const handleResetError = () => {
    if (isShowValidator) {
      setIsShowValidator(false);
      dispatch(resetChangePasswordResponse());
    }
  };
  React.useEffect(() => {
    if (resChangePassword) setIsShowValidator(true);
  }, [resChangePassword]);
  return (
    <>
      <PageHead
        title={t("meta.title_change_password")}
        content={t("meta.content_change_password")}
      />
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
              error="current_password"
              label={t("member.change_password.field_old_password")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={renderErrorTranslate("current_password")}
              response={isShowValidator ? resChangePassword : undefined}
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
                  onMouseDown={handleResetError}
                  onChange={handleResetError}
                />
              }
            />
          </Col>
          <Col span={24}>
            <InputField
              field="password"
              error="password"
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
              error="password_confirmation"
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
