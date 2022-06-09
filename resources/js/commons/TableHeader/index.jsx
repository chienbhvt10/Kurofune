import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {  useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../commons/Breadcrumb";
import "./table-header.scss";
export const TableHeader = ({
  children,
  title,
  breadcrumb,
  addLink,
  onSearch,
  searchField,
  searchPlaceHolder,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNavigateCreate = () => {
    navigate(addLink);
  };

  return (
    <Row justify="center" className="table-header">
      <Col span={24}>
        <Breadcrumb title={title} breadcrumb={breadcrumb} />
      </Col>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Row align="middle">
              <Col>
                {addLink ? (
                  <Button type="primary" onClick={onNavigateCreate}>
                    <FontAwesomeIcon className="mr-1" icon={faPlus} />
                    {t("admins.btn_add_new")}
                  </Button>
                ) : (
                  <></>
                )}
              </Col>
              <Col className="filter">{children}</Col>
            </Row>
          </Col>
          {searchField && <Col>
            <Form onFinish={onSearch} autoComplete="off">
              <Row align="middle">
                <Col>
                  <Form.Item name={searchField} className="search-field">
                    <Input type="text" placeholder={searchPlaceHolder} />
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    className="btn-search"
                    type="primary"
                    htmlType="submit"
                  >
                    {t("admins.btn_search")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>}

        </Row>
      </Col>
    </Row>
  );
};
