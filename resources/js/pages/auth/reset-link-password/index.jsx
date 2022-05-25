import { Row, Typography, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./reset-link-password.scss";

const ResetLinkPassword = () => {
  const lang = localStorage.getItem("lang");

  const backLogin = () => {
    localStorage.removeItem("reset_email");
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Row>
        <Col span={24}>
        <Typography.Title className="title" level={4}>Password reset email has been sent.</Typography.Title>
      </Col>
      <Col span={24} className="text-center">
          The password reissue email has been sent.
          <br />
          Please check your registered email address.
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
