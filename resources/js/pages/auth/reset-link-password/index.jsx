import { Row, Typography, Col } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
              BACK
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ResetLinkPassword;
