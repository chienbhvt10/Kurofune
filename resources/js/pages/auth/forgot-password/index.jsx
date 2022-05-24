import { Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import useForgotPassword from "../../../hooks/auth/useForgotPassword";
import "./forgot-password.scss";

const ForgotPassword = () => {
  const lang = localStorage.getItem("lang");
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
    <div id="forgot-password-page">
      <Form
        form={form}
        className="forgot-password-form"
        onFinish={onResetRequest}
        initialValues={forgotEmailInitValues}
      >
        <Row justify="center" className="container">
          <div className="box-text">
            <p>
              Lost your password? Please enter your email address.
              <br />
              You will receive a link to create a new password via email.
            </p>
          </div>
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
          <Col span={24}>
            <Row justify="center">
              <button type="submit" className="btn btn-primary w-auto">
                RESET PASSWORD{" "}
              </button>
            </Row>
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
    </div>
  );
};
export default ForgotPassword;
