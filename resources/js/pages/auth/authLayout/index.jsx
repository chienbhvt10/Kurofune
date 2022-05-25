import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
export const AuthLayout = () => {
  return (
    <Row align="center" justify="middle">
      <Col xs={0} md={12}>
        <img
          src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/bg_login-register.jpg"
          alt=""
          style={{ height: "100vh", width: "100%" }}
        />
      </Col>
      <Col xs={24} md={12}>
        <Outlet></Outlet>
      </Col>
    </Row>
  );
};
