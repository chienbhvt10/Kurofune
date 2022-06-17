import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import { Languages } from "../../../commons/Languges";
import PageHead from "../../../commons/PageHead";
import ModalPolicy from "../../../components/Modal/ModalPolicy";
import ModalTerm from "../../../components/Modal/ModalTerm";
import { getCurrentLanguage } from "../../../helper/localStorage";
import { validateAuth } from "../../../helper/validateField";
import useLogin from "../../../hooks/auth/useLogin";
import useLogout from "../../../hooks/auth/useLogout";
import "./style.scss";
const { Title } = Typography;
export const Login = () => {
  const [show, setShow] = React.useState(true);
  const resLogin = useSelector((state) => state.authState.resLogin);
  const { t } = useTranslation();
  const {} = useLogout();
  const lang = getCurrentLanguage();
  const { loginUser, loadingLogin } = useLogin();
  const [form] = Form.useForm();
  function createMarkup() {
    return { __html: t("login.title") };
  }
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const onLogin = (values) => {
    loginUser(values);
  };

  const renderErrorTranslate = (field) => {
    return validateAuth?.login?.[field].map((item) => {
      return {
        ...item,
        message: t(item.message),
      };
    });
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <PageHead
          title={t("meta.title_login")}
          content={t("meta.content_login")}
        />
        <Title className="title" level={4}>
          <span dangerouslySetInnerHTML={createMarkup()} />
        </Title>
        <Form
          id="loginForm"
          form={form}
          onFinish={onLogin}
          name="login-form"
          initialValues={initialValues}
          autoComplete="off"
        >
          <Row justify="center">
            <Col span={24}>
              <InputField
                field="email"
                label={t("login.email")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                response={resLogin}
                rules={renderErrorTranslate("email")}
                className="input-control"
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
              <InputField
                field="password"
                label={t("login.password")}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                response={resLogin}
                className="input-control"
                rules={renderErrorTranslate("password")}
                type={
                  <Input
                    className="input-field"
                    type={show ? "password" : "text"}
                    addonBefore={
                      <img
                        className="icon-input"
                        src="/images/ic-key.png"
                        alt=""
                      />
                    }
                    addonAfter={
                      <FontAwesomeIcon
                        icon={show ? faEyeSlash : faEye}
                        color="#515151"
                        size="sm"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShow(!show)}
                      />
                    }
                  />
                }
              />
            </Col>
            <Col span={24}>
              <Row
                className="remember-block"
                justify="space-between"
                align="center"
              >
                <Col>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    label=""
                    className="remember"
                  >
                    <Checkbox>{t("login.remember")}</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Link
                    to={`${lang}/forgot-password`}
                    className="text-decoration-none text-forgot"
                  >
                    {t("login.forgetPassword")}
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Button
                loading={loadingLogin}
                className="w-100"
                size="large"
                type="primary"
                htmlType="submit"
              >
                {t("login.login_btn")}
              </Button>
            </Col>
          </Row>
        </Form>
        <Row justify="center" className="mt-4">
          <Col>
            <ModalTerm text={t("login.term_of_use")} />
          </Col>
          <Col style={{ marginLeft: 10 }}>
            <ModalPolicy text={t("login.privacy_policy")} />
          </Col>
        </Row>
        <div className="dropdown-language-menu text-center">
          <Languages />
          {t("login.kurofune")} 2022
        </div>
      </Col>
    </Row>
  );
};
