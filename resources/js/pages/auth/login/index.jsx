import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../commons/Form/InputField";
import { Languages } from "../../../commons/Languges";
import PageHead from "../../../commons/PageHead";
import ModalPolicy from "../../../components/Modal/ModalPolicy";
import ModalTerm from "../../../components/Modal/ModalTerm";
import useLogin from "../../../hooks/auth/useLogin";
import "./style.scss";

export const Login = () => {
  const [show, setShow] = useState(true);
  const resLogin = useSelector((state) => state.authState.resLogin);
  const { i18n, t } = useTranslation();
  const lang = localStorage.getItem("lang");
  const { loginUser } = useLogin();
  const [form] = Form.useForm();

  function createMarkup() {
    return { __html: t("login.title") };
  }
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  React.useEffect(() => {
    if (resLogin?.status_code === 200) {
      navigate(`${lang}/media`);
    }
  }, [resLogin]);
  const onLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <Row justify="center" id="login-page">
      <Col style={{ maxWidth: 425 }}>
        <PageHead content="Login" title="Login" />
        <h4 className="title" dangerouslySetInnerHTML={createMarkup()}></h4>
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
                  <Form.Item name="remember" className="remember">
                    <Checkbox value="checked">
                      <span className="remember-label">
                        {t("login.remember")}
                      </span>
                    </Checkbox>
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
            <Col span={24}>
              <button className="btn btn-primary d-block m-auto" type="submit">
                {t("login.login_btn")}
              </button>
            </Col>
          </Row>
        </Form>
        <Row justify="center" style={{ marginTop: 40 }}>
          <Col style={{ marginRight: 10 }}>
            <ModalTerm text={t("login.term_of_use")} />
          </Col>
          <Col>
            <ModalPolicy text={t("login.privacy_policy")} />
          </Col>
        </Row>
        <div className="dropdown-language-menu">
          <Languages />
          <span className="footer-text">{t("login.kurofune")} 2022</span>
        </div>
      </Col>
    </Row>
  );
};
