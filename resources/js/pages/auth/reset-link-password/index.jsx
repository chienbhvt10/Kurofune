import { Row, Typography, Col, Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHead from "../../../commons/PageHead";
import {
  getCurrentLanguage,
  removeResetMail,
} from "../../../helper/localStorage";
import "./reset-link-password.scss";

const ResetLinkPassword = () => {
  const { t } = useTranslation();
  const lang = getCurrentLanguage();

  const backLogin = () => {
    removeResetMail();
  };

  return (
    <>
      <PageHead
        title={t("meta.title_forgot_password")}
        content={t("meta.content_forgot_password")}
      />
      <Row justify="center">
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Typography.Title className="title" level={4}>
                {t("reset_password.reset_password_title")}
              </Typography.Title>
            </Col>
            <Col span={24} className="text-center">
              {t("reset_password.reset_password_message1")}
              <br />
              {t("reset_password.reset_password_message2")}
            </Col>
            <Col span={24} className="text-center mt-2">
              <Link to={`${lang}/login`} onClick={backLogin}>
                <Button className="accept-btn" size="large" type="primary">
                  OK
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ResetLinkPassword;
