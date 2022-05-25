import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import useResetPassword from "../../../hooks/auth/useResetPassword";
import "./reset-password.scss";

const ResetPassword = () => {
  const [param, setParam] = useSearchParams();
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const { resResetPassword, getResetPassword, resetResponse } =
    useResetPassword();
  const lang = localStorage.getItem("lang");
  const resetEmail = localStorage.getItem("reset_email");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const resetPasswordInitValues = {
    token: param.get("token"),
    email: resetEmail,
    password: "",
    password_confirmation: "",
  };

  React.useEffect(() => {
    if (!resResetPassword || resResetPassword?.status_code !== 200) {
      return;
    } else {
      navigate(`${lang}/login`);
      resetResponse();
    }
  }, [resResetPassword]);

  React.useEffect(() => {
    form.setFieldsValue(resetPasswordInitValues);
  }, [param]);

  const onResetPassword = async (values) => {
    await getResetPassword(values);
    if (resResetPassword.status_code === 200) {
      navigate(`${lang}/login`);
    }
  };
  return (
    <div id="reset-password">
      <Form
        initialValues={resetPasswordInitValues}
        name="reset-password-form"
        className="reset-password-form"
        onFinish={onResetPassword}
        autoComplete="off"
      >
        <Row justify="center" align="middle" className="h-100">
          <Col span={24}>
            <InputField
              field="email"
              label="Email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              response={resResetPassword}
              rules={[{ required: true, message: "Please input email" }]}
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
              rules={[{ required: true, message: "Please input new password" }]}
              response={resResetPassword}
              type={
                <Input
                  type={!showPassword ? "password" : "text"}
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

          <InputField
            field="token"
            label=""
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            response={resResetPassword}
            type={<Input hidden />}
          />
          <Col span={24}>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ResetPassword;
